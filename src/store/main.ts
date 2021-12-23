import { defineStore } from 'pinia';

// 模拟异步
function doAjaxRequest(data: string): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
}
export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    name: '超级管理员',
  }),
  getters: {
    nameLength: (state) => state.name.length,
  },
  actions: {
    async insertPost(data: string) {
      // 可以做异步
      const res: string = await doAjaxRequest(data);
      this.name = res;
    },
  },
});
