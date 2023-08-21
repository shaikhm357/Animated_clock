const faceColor = document.getElementById('face-color')
const borderColor = document.getElementById('border-color')
const lineColor = document.getElementById('line-color')
const largeHandColor = document.getElementById('large-hand-color')
const secondColor = document.getElementById('second-color')

function clock() {
  const now = new Date()
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  // setup canvas
  ctx.save()
  ctx.clearRect(0, 0, 500, 500)
  ctx.translate(250, 250) //put 0,0 in middle
  ctx.rotate(-Math.PI / 2) // rotate -90 deg

  //default style
  ctx.strokeStyle = '#000000'
  ctx.fillStyle = '#f4f4f4'
  ctx.lineWidth = 5
  ctx.lineCap = 'round'

  //Draw clock face/border
  ctx.save()
  ctx.beginPath()
  ctx.lineWidth = 14
  ctx.strokeStyle = '#800000'
  ctx.strokeStyle = borderColor.value
  ctx.fillStyle = faceColor.value
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true)
  ctx.stroke()
  ctx.fill()
  ctx.restore()

  //draw hr marks lines
  ctx.save()
  ctx.strokeStyle = lineColor.value
  for (let i = 0; i < 12; i++) {
    ctx.beginPath()
    ctx.rotate(Math.PI / 6)
    ctx.moveTo(100, 0)
    ctx.lineTo(120, 0)
    ctx.stroke()
  }
  ctx.restore()

  //Draw minuts lines
  ctx.save()
  ctx.lineWidth = 4
  ctx.strokeStyle = lineColor.value
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath()
      ctx.moveTo(117, 0)
      ctx.lineTo(120, 0)
      ctx.stroke()
    }
    ctx.rotate(Math.PI / 30)
  }
  ctx.restore()

  //get  curr time
  const hr = now.getHours()
  const min = now.getMinutes()
  const sec = now.getSeconds()

  //   console.log(`${hr}:${min}:${sec}`)

  //draw hr hand
  ctx.save()

  ctx.rotate((Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec)
  ctx.strokeStyle = '#800000'
  ctx.strokeStyle = largeHandColor.value
  ctx.lineWidth = 14
  ctx.beginPath()
  ctx.moveTo(-20, 0)
  ctx.lineTo(80, 0)
  ctx.stroke()
  ctx.restore()

  //draw min hand
  ctx.save()
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec)
  ctx.strokeStyle = '#800000'
  ctx.strokeStyle = largeHandColor.value
  ctx.lineWidth = 8
  ctx.beginPath()
  ctx.moveTo(-28, 0)
  ctx.lineTo(112, 0)
  ctx.stroke()
  ctx.restore()

  //draw min hand
  ctx.save()
  ctx.rotate((Math.PI / 30) * sec)
  ctx.strokeStyle = '#FF7F50'
  ctx.strokeStyle = secondColor.value
  ctx.fillStyle = '#FF7F50'
  ctx.fillStyle = secondColor.value
  ctx.lineWidth = 6
  ctx.beginPath()
  ctx.moveTo(-30, 0)
  ctx.lineTo(100, 0)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true)
  ctx.fill()
  ctx.restore()

  ctx.restore()
  requestAnimationFrame(clock)
}
requestAnimationFrame(clock)
// clock()

const saveAsImage = document.getElementById('save-as-img')
saveAsImage.addEventListener('click', () => {
  //   e.preventDefault()
  const dataUrl = canvas.toDataURL('image/png')
  const link = document.createElement('a')
  link.download = 'clock.png'
  link.href = dataUrl
  link.click()
})

