<template>
  <div class="timer">
    <div class="day">
      <span class="number">{{ days }}</span>
      <div class="format">{{ settings.day }}</div>
    </div>
    <div class="hour">
      <span class="number">{{ hours }}</span>
      <div class="format">{{ settings.hours }}</div>
    </div>
    <div class="min">
      <span class="number">{{ minutes }}</span>
      <div class="format">{{ settings.minutes }}</div>
    </div>
    <div class="sec">
      <span class="number">{{ seconds }}</span>
      <div class="format">{{ settings.seconds }}</div>
    </div>
    <div class="message">{{ message }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Timer',

  props: {
    start: {
      type: [String, Number],
      default: () => '',
    },
    end: {
      type: [String, Number],
      default: () => '',
    },
    settings: {
      type: Object,
      default: () => ({
        day: 'Дней',
        hours: 'Часов',
        minutes: 'Минут',
        seconds: 'Секунд',
        expired: '',
        running: '',
        upcoming: '',
        status: {
          expired: 'Expired',
          running: 'Running',
          upcoming: 'Future',
        },
      }),
    },
  },

  data() {
    return {
      timer: '',
      interval: '',
      days: '',
      minutes: '',
      hours: '',
      seconds: '',
      message: '',
      statusType: '',
      statusText: '',

      timezones: {
        '001': 'Asia/Aqtau',
        '002': 'Europe/Moscow',
      },
    }
  },

  computed: {
    ...mapState({
      shopId: (state) => state.geo.shopId,
    }),
  },

  mounted() {
    this.updateTimer()

    this.interval = setInterval(() => {
      this.timerCount(this.start, this.end)
    }, 1000)
  },

  beforeUpdate() {
    this.updateTimer()
  },

  beforeDestroy() {
    clearInterval(this.interval)
  },

  methods: {
    timerCount(start, end) {
      // Get todays date and time
      const now = this.$dayjs().utc().tz(this.timezones[this.shopId]).valueOf()

      // Find the distance between now an the count down date
      const distance = start - now
      const passTime = end - now

      if (distance < 0 && passTime < 0) {
        this.message = this.settings.expired
        this.statusType = 'expired'
        this.statusText = this.settings.status.expired
        clearInterval(this.interval)
      } else if (distance < 0 && passTime > 0) {
        this.calcTime(passTime)
        this.message = this.settings.running
        this.statusType = 'running'
        this.statusText = this.settings.status.running
      } else if (distance > 0 && passTime > 0) {
        this.calcTime(distance)
        this.message = this.settings.upcoming
        this.statusType = 'upcoming'
        this.statusText = this.settings.status.upcoming
      }
    },
    calcTime(dist) {
      // Time calculations for days, hours, minutes and seconds
      this.days = Math.floor(dist / (1000 * 60 * 60 * 24))
      this.hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      this.minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60))
      this.seconds = Math.floor((dist % (1000 * 60)) / 1000)
    },
    updateTimer() {
      // Update the count down every 1 second
      this.timerCount(this.start, this.end)
    },
  },
}
</script>

<style scoped lang="scss">
.timer {
  font-size: 20px;

  .day,
  .hour,
  .min,
  .sec {
    font-size: 30px;
    display: inline-block;
    font-weight: 500;
    text-align: center;
    margin: 0 5px;
    width: 20%;
    max-width: 60px;

    .format {
      font-weight: 300;
      font-size: 14px;
      //@include margin-start(5);
      //display: inline-block;
      opacity: 0.8;
      width: 60px;
    }
  }
  .number {
    color: #fff;
    background: rgba(51, 51, 51, 0.53);
    padding: 0 5px;
    border-radius: 5px;
    display: inline-block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .message {
    font-size: 14px;
    font-weight: 400;
    margin-top: 5px;
  }
  .status-tag {
    width: 270px;
    margin: 10px auto;
    padding: 8px 0;
    font-weight: 500;
    color: #000;
    text-align: center;
    border-radius: 15px;
    &.upcoming {
      background-color: lightGreen;
    }
    &.running {
      background-color: gold;
    }
    &.expired {
      background-color: silver;
    }
  }
}
</style>
