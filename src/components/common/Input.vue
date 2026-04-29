<template>
  <div class="input-group">
    <label v-if="label" class="label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="input"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.input-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.label {
  font-size: 12px;
  font-weight: 500;
  color: var(--gray-700);
}

.required {
  color: var(--danger);
}

.input {
  padding: 7px 11px;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  font-size: 12px;
  color: var(--gray-900);
  background-color: white;
  transition: border-color 0.2s ease;
}

.input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.input:disabled {
  background-color: var(--gray-50);
  color: var(--gray-500);
  cursor: not-allowed;
}

.input.error {
  border-color: #FCA5A5;
  background-color: var(--danger-light);
}

.error {
  font-size: 11px;
  color: var(--danger);
}
</style>
