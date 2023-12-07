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
				      left: 0,
				      right: 0,
				      // 开启缩放和平移
				      roam: false,
				      // 树图布局
				      layout: 'orthogonal',
				      // 从右到左 LR, RL, TB, BT
				      orient: 'TB',
				      // 定义图片
				      symbol: 'circle',
				      symbolSize: 100,
				      // symbolOffset: [0,-30],
				      // 展开的节点 -1，null 或者 undefined 表示所有节点都展开
				      initialTreeDepth: -1,
				      // 开启折叠节点
				      expandAndCollapse: true,
				      label: {
				        show: true,
				        offset: [0, 0],
				        align: 'center',
						color: '#FFFFFF',
						lineHeight: 15,
						fontSize: 12,
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
				},
				data: [
					{
					  name: '张某某/r/n13800000000/r/n直推人数:3000/r/n收益:3000/r/n等级:悟',
					  value: '角色',
					  label: { offset: [0, 0]},
					  itemStyle: { color: '#FF0000' },
					  children: [
						{
						  name: '张某某/r/n13800000000/r/n直推人数:3000/r/n收益:3000/r/n等级:悟',
						  value: '角色',
						  label: { offset: [0, 0] },
						  children: [
							{
							  name: '张某某/r/n13800000000/r/n直推人数:3000/r/n收益:3000/r/n等级:悟',
							  value: '角色',
							  label: { offset: [0, 0] },
							  children: [
								{
								  name: '张某某/r/n13800000000/r/n直推人数:3000/r/n收益:3000/r/n等级:悟',
								  value: '角色',
								  label: { offset: [0, 0] },
								  children: [
								{
								  name: '张某某/r/n13800000000/r/n直推人数:3000/r/n收益:3000/r/n等级:悟',
								  value: '角色',
								  label: { offset: [0, 0] },
								},
								{
								  name: '张某某/r/n13800000000/r/n直推人数:3000/r/n收益:3000/r/n等级:悟',
								  value: '角色',
								  label: { offset: [0, 0] },
								}
							  ]
								},
								{
								  name: '张某某/r/n13800000000/r/n直推人数:3000/r/n收益:3000/r/n等级:悟',
								  value: '角色',
								  label: { offset: [0, 0] },
								  children: [
								{
								  name: '张某某/r/n13800000000/r/n直推人数:3000/r/n收益:3000/r/n等级:悟',
								  value: '角色',
								  label: { offset: [0, 0] },
								},
								{
								  name: '张某某/r/n13800000000/r/n直推人数:3000/r/n收益:3000/r/n等级:悟',
								  value: '角色',
								  label: { offset: [0, 0] },
								}
							  ]
								}
							  ]
							},
							{
							  name: '张某某/r/n13800000000/r/n直推人数:3000/r/n收益:3000/r/n等级:悟',
							  value: '角色',
							  label: { offset: [0, 0] },
							  children: [
								{
								  name: '张某某/r/n13800000000/r/n直推人数:3000/r/n收益:3000/r/n等级:悟',
								  value: '角色',
								  label: { offset: [0, 0] },
								  children: [
								{
								  name: '张某某/r/n13800000000/r/n直推人数:3000/r/n收益:3000/r/n等级:悟',
								  value: '角色',
								  label: { offset: [0, 0] },
								},
								{
								  name: '张某某/r/n13800000000/r/n直推人数:3000/r/n收益:3000/r/n等级:悟',
								  value: '角色',
								  label: { offset: [0, 0] },
								}
							  ]
								},
								{
								  name: '张某某/r/n13800000000/r/n直推人数:3000/r/n收益:3000/r/n等级:悟',
								  value: '角色',
								  label: { offset: [0, 0] },
								  children: [
								{
								  name: '张某某/r/n13800000000/r/n直推人数:3000/r/n收益:3000/r/n等级:悟',
								  value: '角色',
								  label: { offset: [0, 0] },
								},
								{
								  name: '张某某/r/n13800000000/r/n直推人数:3000/r/n收益:3000/r/n等级:悟',
								  value: '角色',
								  label: { offset: [0, 0] },
								}
							  ]
								}
							  ]
							}
						  ]
						},
						{
						  name: '张某某/r/n13800000000/r/n直推人数:3000/r/n收益:3000/r/n等级:悟',
						  value: '角色',
						  label: { offset: [0, 0] },
						  children: [
							{
							  name: '张某某/r/n13800000000/r/n直推人数:3000/r/n收益:3000/r/n等级:悟',
							  value: '角色',
							  label: { offset: [0, 0] },
							  children: [
								{
								  name: '张某某/r/n13800000000/r/n直推人数:3000/r/n收益:3000/r/n等级:悟',
								  value: '角色',
								  label: { offset: [0, 0] },
								},
								{
								  name: '张某某/r/n13800000000/r/n直推人数:3000/r/n收益:3000/r/n等级:悟',
								  value: '角色',
								  label: { offset: [0, 0] },
								  children: [
								{
								  name: '张某某/r/n13800000000/r/n直推人数:3000/r/n收益:3000/r/n等级:悟',
								  value: '角色',
								  label: { offset: [0, 0] },
								},
								{
								  name: '张某某/r/n13800000000/r/n直推人数:3000/r/n收益:3000/r/n等级:悟',
								  value: '角色',
								  label: { offset: [0, 0] },
								}
							  ]
								}
							  ]
							}
						  ]
						}
					  ]
					}
				]
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
				canvas.style.width = '100px'
				canvas.style.height = '2000px'
				
				const myChart = echarts.init(canvas)
				myChart.setOption(this.option)
			}
		}
	}
</script>

<style lang="scss">

</style>
