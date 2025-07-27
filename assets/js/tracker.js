const SETTINGS = {
  editing: null,
  data: [],
};

let tracker = window.localStorage.getItem("appData");

if (!tracker) {
  window.localStorage.setItem("appData", JSON.stringify(SETTINGS));
}

tracker = window.localStorage.getItem("appData");
tracker = JSON.parse(tracker);

SETTINGS.tracker = tracker;

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const app = new Vue({
  el: "#app",
  data() {
    return {
      ...SETTINGS,
    };
  },
  watch: {
    tracker: {
      handler(newValue, oldValue) {
        window.localStorage.setItem("appData", JSON.stringify(this.tracker));
      },
      deep: true,
    },
  },
  methods: {
    createDataPoint() {
      const dataPoint = {
        name: `New Data Point ${this.tracker.data.length + 1}`,
        value: 0,
        id: uuidv4(),
      };
      this.tracker.data.push(dataPoint);
    },
    duplicateDataPoint(id) {
      const item = this.tracker.data.find((item) => item.id === id);
      if (item) {
        const newItem = { ...item, name: `${item.name} (Copy)`, id: uuidv4() };
        // insert new item after the original
        const index = this.tracker.data.findIndex((i) => i.id === id);
        if (index !== -1) {
          this.tracker.data.splice(index + 1, 0, newItem);
        } else {
          this.tracker.data.push(newItem);
        }
        this.editing = newItem.id;
      }
    },
    deleteDataPoint(id) {
      this.tracker.data = this.tracker.data.filter((item) => item.id !== id);
    },
  },
  beforeMount() {
    this.$data = SETTINGS;
  },
});
