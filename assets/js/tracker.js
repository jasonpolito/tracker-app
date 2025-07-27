const database = new LDBX("tracker", true, true);
let tracker = database.where("name", "tracker").first();

if (!tracker) {
  database.save({
    name: "tracker",
    data: [{}],
  });
  tracker = database.where("name", "tracker").first();
}

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
      tracker,
    };
  },
  watch: {
    tracker: {
      handler(newValue, oldValue) {
        database.update(this.tracker);
      },
      deep: true,
    },
  },
  methods: {
    createDataPoint() {
      const dataPoint = {
        name: "New Data Point",
        value: 0,
        id: uuidv4(),
      };
      this.tracker.data.push(dataPoint);
    },
    deleteDataPoint(id) {
      this.tracker.data = this.tracker.data.filter((item) => item.id !== id);
    },
  },
  beforeMount() {
    this.tracker = tracker;
  },
});
