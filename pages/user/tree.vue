<template>
	<view class="content"></view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			this.$server.setTitle()
		},
		methods: {

		}
	}
	
	const root = {
	      value: 'A',
	      label: '100',
	      left: {
	        value: 'B',
	        label: '70',
	        left: {
	          value: 'D',
	          label: '40',
	          left: {
	            value: 'H',
	            label: '20',
	            left: {
	              value: 'P',
	              label: '20',
	              left: {
	                value: 'P',
	                label: '20',
	                left: {
	                  value: 'P',
	                  label: '20',
	                  left: null,
	                  right: null
	                },
	                right: {
	                  value: 'Q',
	                  label: '20',
	                				left: null,
	                  right: null
	                }
	              },
	              right: {
	                value: 'Q',
	                label: '20',
	              				left: null,
	                right: null
	              }
	            },
	            right: {
	              value: 'Q',
	              label: '20',
	            				left: null,
	              right: null
	            }
	          },
	          right: {
	            value: 'I',
	            label: '20',
	            left: null,
	            right: null
	          }
	        },
	        right: {
	          value: 'E',
	          label: '30',
	          left: {
	            value: 'J',
	            label: '20',
	            left: null,
	            right: null
	          },
	          right: {
	            value: 'K',
	            label: '20',
	            left: null,
	            right: null
	          }
	        }
	      },
	      right: {
	        value: 'C',
	        label: '30',
	        left: {
	          value: 'F',
	          label: '15',
	          left: {
	            value: 'L',
	            label: '20',
	            left: null,
	            right: null
	          },
	          right: {
	            value: 'M',
	            label: '20',
	            left: null,
	            right: null
	          }
	        },
	        right: {
	          value: 'G',
	          label: '15',
	          left: {
	            value: 'N',
	            label: '20',
	            left: {
	              value: 'P',
	              label: '20',
	              left: null,
	              right: null
	            },
	            right: {
	              value: 'Q',
	              label: '20',
	            				left: null,
	              right: null
	            }
	          },
	          right: {
	            value: 'O',
	            label: '20',
				left: {
				  value: 'R',
				  label: '20',
				  left: null,
				  right: null
				},
				right: {
				  value: 'S',
				  label: '20',
				  left: null,
				  right: null
				}
	          }
	        }
	      }
	    }
		
		// 创建一个新的 canvas 元素
		const canvas = document.createElement('canvas')
		canvas.style.position = 'absolute'
		canvas.style.top = '55px'
		
		// 将 canvas 添加到body
		document.body.appendChild(canvas)
		
		// 设置body自动滚动
		document.body.style.overflow = 'auto'
		
		const ctx = canvas.getContext('2d')
			
		const r = 50
		const nodeColor = '#000000'
		const textColor = '#FFFFFF'
		const fontSize = parseInt(r / 4.5) + 'px serif'
		const paddingW = 10
		const paddingH = 10
		const spaceH = 0
		const deep = getDeepOfTree(root)
		const width = Math.pow(2, deep - 1) * 2 * r + 2 * paddingW
		const height = deep * (2 * r + spaceH) - spaceH + 2 * paddingH
		
		canvas.setAttribute('width', width)
		canvas.setAttribute('height', height)
			
		const rootX = width / 2
		const rootY = paddingH + r
		preOrderTraverse(root, rootX, rootY, 0)

	    // 得到该树的高度
	    function getDeepOfTree(root) {
			if (!root) {
				return 0
			}
			let left = getDeepOfTree(root.left)
			let right = getDeepOfTree(root.right)
			return (left > right) ? left + 1 : right + 1
	    }
	
		// 递归画节点
	    function preOrderTraverse(root, x, y, spaceW) {
			if (spaceW === 0) {
				spaceW = (width - 2 * paddingW) / 2 / 2
			} else {
				spaceW = spaceW / 2
			}
			drawArc(x, y) // 绘制节点
			if (root.left) {
				drawLeftLine(x, y, x - spaceW, y + 2 * r + spaceH)
				preOrderTraverse(root.left, x - spaceW, y + 2 * r + spaceH, spaceW)
			}
			if (root.right) {
				drawRightLine(x, y, x + spaceW, y + 2 * r + spaceH)
				preOrderTraverse(root.right, x + spaceW, y + 2 * r + spaceH, spaceW)
			}
			drawText(x, y, root.value) // 写内容
	    }
		
		// 画节点
	    function drawArc(x, y) {
			ctx.strokeStyle = nodeColor
			ctx.fillStyle = nodeColor
			ctx.beginPath()
			ctx.arc(x, y, r, 0, 2 * Math.PI)
			ctx.stroke()
			ctx.fill()
	    }
		
		// 写内容
		function drawText(x, y, text) {
			const top = 5
			y += r / 10
			ctx.fillStyle = textColor
			ctx.font = fontSize
			ctx.fillText('张某某', x - r / 2, y - (r - top) / 6 * 5)
			ctx.fillText('13800000000', x - r / 2 - r / 4, y - (r - top) / 6 * 3)
			ctx.fillText('直推人数:3000', x - r / 2 - r / 4 - r / 8, y - (r - top) / 6 * 1)
			ctx.fillText('收益:3000', x - r / 2 - r / 4 - r / 8, y + (r - top) / 6 * 1)
			ctx.fillText('不是直推', x - r / 2 - r / 4, y + (r - top) / 6 * 3)
			ctx.fillText('等级:悟', x - r / 2, y + (r - top) / 6 * 5)
		}
	
		// 左侧连线
	    function drawLeftLine (x1, y1, x2, y2) {
			ctx.strokeStyle = nodeColor
			ctx.beginPath()
			ctx.moveTo(x1, y1)
			ctx.lineTo(x2, y2)
			ctx.stroke()
	    }
	
		// 右侧连线
	    function drawRightLine (x1, y1, x2, y2) {
			ctx.strokeStyle = nodeColor
			ctx.beginPath()
			ctx.moveTo(x1, y1)
			ctx.lineTo(x2, y2)
			ctx.stroke()
	    }
</script>

<style lang="scss">
	
</style>
