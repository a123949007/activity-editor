import Vue from 'vue'

const event = new Vue()

export const sentEvent = (...arg) => event.$emit(...arg)

export const listenEvent = (...arg) => event.$on(...arg)
