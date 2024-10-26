<script setup lang="ts">
import { CalendarProps } from "./calendar";
import { computed, ref, watch } from "vue";
defineOptions({
	name: "zc-calendar",
});
const props = withDefaults(defineProps<CalendarProps>(), {
	value: () => new Date(),
	width: 500,
	customDateCell: false,
});

/**
 * 计算展示内容的逻辑
 */
const thirtyOneDaysMonths = [0, 2, 4, 6, 7, 9, 11];
const thirtyDaysMonths = [3, 5, 8, 10];

const showedMonth = ref<number>(props.value.getMonth());
const showedYear = ref<number>(props.value.getFullYear());
const showedDays = ref<number[]>([]);
let showedMonthStartDayIndex = ref<number>(0);
let showedMonthEndDayIndex = ref<number>(31);

const isLeapYear = (year: number) => {
	if ((year % 4 && year % 100 !== 0) || year % 400) {
		return true;
	}
	return false;
};
const FebraryDays = computed(() => {
	return isLeapYear(showedYear.value) ? 29 : 28;
});

const calulateShowedMonthDays = () => {
	showedDays.value.splice(0, showedDays.value.length);
	const showedMonthFirstDate = new Date(showedYear.value, showedMonth.value);
	const showedMonthFirstDay = showedMonthFirstDate.getDay();
	showedMonthStartDayIndex.value = showedMonthFirstDay;

	const prevMonth = (showedMonth.value - 1 + 12) % 12;
	let day = 31;
	if (thirtyOneDaysMonths.includes(prevMonth)) {
		day = 31;
	} else if (thirtyDaysMonths.includes(prevMonth)) {
		day = 30;
	} else {
		day = FebraryDays.value;
	}
	for (let i = 1; i <= showedMonthFirstDay; i++) {
		showedDays.value.unshift(day);
		day--;
	}

	if (thirtyOneDaysMonths.includes(showedMonth.value)) {
		day = 31;
	} else if (thirtyDaysMonths.includes(showedMonth.value)) {
		day = 30;
	} else {
		day = FebraryDays.value;
	}
	for (let i = 1; i <= day; i++) {
		showedDays.value.push(i);
	}
	showedMonthEndDayIndex.value = showedDays.value.length - 1;

	const showedMonthLastDay = new Date(showedYear.value, showedMonth.value, day);
	for (let i = 1; i <= 6 - showedMonthLastDay.getDay(); i++) {
		showedDays.value.push(i);
	}
};

watch(showedMonth, calulateShowedMonthDays, { immediate: true });
watch(showedYear, calulateShowedMonthDays);

const handleNextMonthClicked = () => {
	showedMonth.value = (showedMonth.value + 1) % 12;
	if (showedMonth.value === 0) {
		showedYear.value++;
	}
};
const handlePrevMonthClicked = () => {
	showedMonth.value = (showedMonth.value - 1 + 12) % 12;
	if (showedMonth.value === 11) {
		showedYear.value--;
	}
};
const handleThisMonthClicked = () => {
	const today = new Date();
	showedMonth.value = today.getMonth();
	showedYear.value = today.getFullYear();
};

/**
 * 处理选中日期的逻辑
 */

// 记录被选中日期的索引
const selectDateCellIndex = ref<number>();
// 记录被选中的日期
const selectedDate = ref<Date | null>(null);
// 点击日期
const handleClick = (selectedIndex: number, date: number) => {
	selectDateCellIndex.value = selectedIndex;
	selectedDate.value = new Date(showedYear.value, showedMonth.value, date);
};
// 检查是否被选中
const checkSelected = (index: number) => {
	return index === selectDateCellIndex.value;
};
// 检查是否在这个月
const checkInThisMonth = (index: number) => {
	return (
		index >= showedMonthStartDayIndex.value &&
		index <= showedMonthEndDayIndex.value
	);
};

/**
 * 暴露给用户的逻辑
 */

// 用户使用插槽时，暴露给用户的日期字符串
const getFormatDate = (day: number) => {
	return showedYear.value + "-" + showedMonth.value + "-" + day;
};
// 暴露给用户被选中的日期
defineExpose({
	selectedDate: selectedDate,
});

const calendarStyle = computed(() => ({
	width: props.width + "px",
	height: (props.width * 9) / 16 + "px",
}));
</script>

<template>
	<div class="zc-calendar" :style="calendarStyle">
		<div class="zc-calendar__header">
			<div>{{ showedYear }}年{{ "  " }}{{ showedMonth + 1 }}月</div>
			<div class="zc-canlendar__header__control">
				<button @click="handlePrevMonthClicked">前一月</button>
				<button @click="handleThisMonthClicked">这个月</button>
				<button @click="handleNextMonthClicked">后一月</button>
			</div>
		</div>
		<div class="zc-calendar__neck">
			<div>日</div>
			<div>一</div>
			<div>二</div>
			<div>三</div>
			<div>四</div>
			<div>五</div>
			<div>六</div>
		</div>
		<div class="zc-calendar__body">
			<template v-for="(day, index) in showedDays" :key="index">
				<div
					v-if="!props.customDateCell"
					@click="handleClick(index, day)"
					:class="{
						'zc-calendar__body__cell--selected': checkSelected(index),
						'zc-calendar__body__cell--not_in_this_month':
							!checkInThisMonth(index),
					}"
				>
					{{ day }}
				</div>
				<slot
					v-else
					:date="getFormatDate(day)"
					:isSelected="index === selectDateCellIndex"
				></slot>
			</template>
		</div>
	</div>
</template>

<style scoped>
.zc-calendar {
	border: 2px solid #ebeef5;
	border-radius: 10px;
	padding: 10px;
	display: flex;
	flex-direction: column;
	.zc-calendar__header {
		height: 10%;
		display: flex;
		justify-content: space-between;
		.zc-canlendar__header__control {
			border: 0.25px solid #ebeef5;
			border-radius: 3px;
			display: flex;
			flex-flow: 1;
			align-items: stretch;
			& > button {
				all: unset;
				border: 0.25px solid #ebeef5;
				cursor: pointer;
				&:hover {
					background-color: #ecf5ff;
					color: #68b2ff;
				}
			}
		}
	}
	.zc-calendar__neck {
		height: 10%;
		display: flex;
		justify-content: space-around;
	}
	.zc-calendar__body {
		height: 80%;
		border: 0.5px solid #ebeef5;
		display: grid;
		grid-template-rows: repeat(5, 1fr);
		grid-template-columns: repeat(7, 1fr);
		grid-auto-rows: 1fr;
		justify-items: stretch;
		align-items: stretch;
		& > div {
			cursor: pointer;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 0.5px solid #ebeef5;
		}
		.zc-calendar__body__cell--not_in_this_month {
			color: #a8abb2;
		}
		.zc-calendar__body__cell--selected {
			background-color: #ecf5ff;
			color: #68b2ff;
		}
	}
}
</style>
