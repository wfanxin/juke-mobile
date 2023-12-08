<template>
	<view class="content">
		<view ref="chart"></view>
	</view>
</template>

<script>
	import * as echarts from 'echarts'
	export default {
		data() {
			return {
				option: {
					series: [
						{
							type: 'tree',
							top: 60,
							left: 10,
							right: 10,
							// 开启缩放和平移
							roam: false,
							// 树图布局
							layout: 'orthogonal',
							// 从右到左 LR, RL, TB, BT
							orient: 'TB',
							// 定义图片
							symbol: 'circle',
							symbolSize: 90,
							// symbolOffset: [0,-30],
							// 展开的节点 -1，null 或者 undefined 表示所有节点都展开
							initialTreeDepth: -1,
							// 开启折叠节点
							expandAndCollapse: false,
							label: {
								show: true,
								offset: [0, 0],
								align: 'center',
								color: '#FFFFFF',
								lineHeight: 13,
								fontSize: 10,
								formatter: (params) => {
									return params.name.replaceAll('|', '\n');
								}
							},
							lineStyle: {
								// 连接线的弧度
								curveness: 0,
								// 线的粗细
								height: 1,
								// 虚线
								type: 'solid'
							},
							itemStyle: { color: '#000000' },
							data: []
						}
					]
				}
			}
		},
		onLoad() {
			
		},
		mounted() {
			this.$server.setTitle()
			this.$server.chekLogin((res) => {
				this.getTree()
			})
		},
		methods: {
			getTree() {
				this.$server.requestGet('user/getTree', {}).then((data) => {
					this.option.series[0].data = data.data.data
					this.drawTree()
				}).catch(() => {
					
				})
			},
			drawTree() {
				// 设置body自动滚动
				document.body.style.overflow = 'auto'
				
				// 获取dom
				const canvas = this.$refs.chart.$el
				if (this.option.series[0].data[0]) {
					if (this.option.series[0].data[0].deep <= 3) {
						this.option.series[0].data[0].deep += 1.2
					}
					canvas.style.width = 140 * this.option.series[0].data[0].widthNum + 'px'
					canvas.style.height = 120 * this.option.series[0].data[0].deep + 'px'
				} else {
					canvas.style.width = '100vw'
					canvas.style.height = '90vh'
				}

				const myChart = echarts.init(canvas)
				myChart.setOption(this.option)
			}
		}
	}
</script>

<style lang="scss">

</style>
