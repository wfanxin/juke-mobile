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
	            left: null,
	            right: null
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
	            left: null,
	            right: null
	          },
	          right: {
	            value: 'O',
	            label: '20',
	            left: null,
	            right: null
	          }
	        }
	      }
	    }
		
		// 创建一个新的 canvas 元素
		const canvas = document.createElement('canvas');

		// 设置 canvas 的宽度
		canvas.width = 100;
		 
		// 将 canvas 添加到body
		document.body.appendChild(canvas);
		
		// 设置body自动滚动
		document.body.style.overflow = "auto"
		
	    const ctx = canvas.getContext('2d')
		
		
	
	    const deep = getDeepOfTree(root)
	    let distance = 1
	    for (let i = 2; i < deep; i++) {
	      distance = (distance + 2) * 2 - 2
	    }
	    const unit = 1000 / (Math.pow(2, deep - 1) * 4 + 8)
		const r = 30
	    canvas.setAttribute('height', deep * unit * 17)
		canvas.setAttribute('width', 2000)
	
	    const rootX = (1000 - unit) / 2
	    const rootY = unit + 50

	    preOrderTraverse(root, rootX, rootY, 400)
	    
	    // 得到该树的高度
	    function getDeepOfTree(root) {
	      if (!root) {
	        return 0
	      }
	      let left = getDeepOfTree(root.left)
	      let right = getDeepOfTree(root.right)
	      return (left > right) ? left + 1 : right + 1
	    }
	
	    function preOrderTraverse(root, x, y, distance) {
			distance = distance / Math.sqrt(4) + 12
	      drawArc(x, y) // 绘制节点
		  drawText(x, y, root.value)
	      if (root.left) {
	        drawLeftLine(x, y, distance)
	        preOrderTraverse(root.left, x - (2 * r + distance) * Math.sqrt(2) / 2, y + Math.sqrt(2) / 2 * (2 * r + distance), distance)
	      }
	      if (root.right) {
	        drawRightLine(x, y, distance)
	        preOrderTraverse(root.right, x + ( 2 * r + distance) * Math.sqrt(2) / 2, y + Math.sqrt(2) / 2 * (2 * r + distance), distance)
	      }
	    }
		
		// 画节点
	    function drawArc(x, y) {
			ctx.strokeStyle = "#0000FF"
			ctx.fillStyle="#000000";
			ctx.beginPath();
			ctx.arc(x, y, r, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.fill();
	    }
		
		// 写内容
		function drawText(x, y, text) {
			ctx.fillStyle="#FFFFFF"
			ctx.font = "12px serif"
			ctx.fillText(text, x, y)
		}
	
		// 左侧连线
	    function drawLeftLine (x, y, distance) {
			ctx.strokeStyle = "#00FFFF"
			ctx.beginPath()
			ctx.moveTo(x - r * Math.sqrt(2) / 2, y + Math.sqrt(2) / 2 * r)
			ctx.lineTo(x - (r + distance) * Math.sqrt(2) / 2, y + Math.sqrt(2) / 2 * (r + distance))
			ctx.stroke()
	    }
	
		// 右侧连线
	    function drawRightLine (x, y, distance) {
			ctx.strokeStyle = "#FF00FF"
			ctx.beginPath()
			ctx.moveTo(x + r * Math.sqrt(2) / 2, y + Math.sqrt(2) / 2 * r)
			ctx.lineTo(x + (r + distance) * Math.sqrt(2) / 2, y + Math.sqrt(2) / 2 * (r + distance))
			ctx.stroke()
	    }
</script>

<style lang="scss">
	
</style>
