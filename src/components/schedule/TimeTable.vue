<template>
  <div class="timetable-wrap">
    <!-- 날짜 헤더 -->
    <div class="date-nav">
      <button class="nav-btn" @click="prevDay">◀</button>
      <span class="date-label">{{ formattedDate }}</span>
      <button class="nav-btn" @click="nextDay">▶</button>
    </div>

    <!-- 시간표 그리드 -->
    <div class="timetable-scroll">
      <div class="timetable-grid" :style="{ height: gridHeight + 'px' }">
        <!-- 시간 레이블 (좌측) -->
        <div class="time-labels">
          <div
            v-for="h in hours"
            :key="h"
            class="time-label"
            :style="{ height: HOUR_H + 'px' }"
          >
            {{ pad(h) }}:00
          </div>
        </div>

        <!-- Task 배치 영역 -->
        <div class="task-area">
          <!-- 시간 구분선 -->
          <div
            v-for="h in hours"
            :key="'line-' + h"
            class="hour-line"
            :style="{ top: (h - START_H) * HOUR_H + 'px' }"
          />

          <!-- Task 블록 -->
          <TimeSlot
            v-for="(item, idx) in layoutItems"
            :key="item.task.id"
            :task="item.task"
            :start-hour="START_H"
            :slot-index="item.colIndex"
            :total-slots="item.totalCols"
            :hour-height="HOUR_H"
            @click="onTaskClick"
          />

          <!-- Task 없을 때 안내 -->
          <div v-if="layoutItems.length === 0" class="empty-day">
            오늘 등록된 일정이 없습니다
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import { useUiStore } from '@/stores/uiStore'
import { useAuthStore } from '@/stores/authStore'
import TimeSlot from './TimeSlot.vue'

const taskStore = useTaskStore()
const uiStore = useUiStore()
const authStore = useAuthStore()

const START_H = 7
const END_H = 20
const HOUR_H = 42
const hours = Array.from({ length: END_H - START_H + 1 }, (_, i) => START_H + i)
const gridHeight = (END_H - START_H + 1) * HOUR_H

const pad = (n) => String(n).padStart(2, '0')

// 날짜 표시 포맷
const formattedDate = computed(() => {
  const d = new Date(taskStore.currentDate + 'T00:00:00')
  const days = ['일', '월', '화', '수', '목', '금', '토']
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 (${days[d.getDay()]})`
})

const prevDay = () => taskStore.changeDate(-1)
const nextDay = () => taskStore.changeDate(1)

// 시간 → 분 변환
const toMin = (dtStr) => {
  const [, t] = dtStr.split('T')
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

// 겹침 감지 및 열 배치 계산
const layoutItems = computed(() => {
  const tasks = taskStore.tasksByDate
  if (!tasks.length) return []

  // 시간순 정렬
  const sorted = [...tasks].sort(
    (a, b) => toMin(a.startDateTime) - toMin(b.startDateTime)
  )

  // 각 Task의 열(column) 배치 결정 (겹치는 Task끼리 그룹)
  const result = []
  const groups = [] // 현재 열별 endMin 추적

  for (const task of sorted) {
    const s = toMin(task.startDateTime)
    const e = toMin(task.endDateTime)

    // 이 Task가 들어갈 수 있는 열 찾기 (endMin <= s인 열)
    let col = groups.findIndex((endMin) => endMin <= s)
    if (col === -1) {
      col = groups.length
      groups.push(e)
    } else {
      groups[col] = e
    }

    result.push({ task, col })
  }

  // 겹치는 Task 그룹별 totalCols 계산
  // 같은 시간대에 겹치는 Task 수를 구함
  const items = result.map((item) => {
    const s = toMin(item.task.startDateTime)
    const e = toMin(item.task.endDateTime)

    const overlapping = result.filter((other) => {
      const os = toMin(other.task.startDateTime)
      const oe = toMin(other.task.endDateTime)
      return os < e && oe > s
    })

    const totalCols = Math.max(...overlapping.map((o) => o.col)) + 1

    return {
      task: item.task,
      colIndex: item.col,
      totalCols
    }
  })

  return items
})

const onTaskClick = (task) => {
  // 권한 판단은 모달 내부에서 처리 (Admin+ → edit, Member → detail)
  const type = authStore.isAdmin ? 'edit' : 'detail'
  uiStore.openModal(type, task)
}
</script>

<style scoped>
.timetable-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.date-nav {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.nav-btn {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  padding: 4px 8px;
  font-size: 12px;
  color: var(--gray-700);
  cursor: pointer;
  transition: background 0.15s;
}

.nav-btn:hover {
  background: var(--gray-50);
}

.date-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--gray-900);
}

.timetable-scroll {
  overflow-y: auto;
  flex: 1;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  background: white;
}

.timetable-grid {
  display: flex;
  position: relative;
}

.time-labels {
  width: 48px;
  min-width: 48px;
  border-right: 1px solid var(--gray-100);
}

.time-label {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 3px 6px 0 0;
  font-size: 10px;
  color: var(--gray-400);
  box-sizing: border-box;
}

.task-area {
  flex: 1;
  position: relative;
}

.hour-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--gray-100);
}

.empty-day {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: var(--gray-400);
}
</style>
