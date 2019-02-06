class Car {
  constructor(num) {
    this.num = num
  }
}

// entry shot
class Camera {
  shot(car) {
    return {
      num: car.num,
      inTime: Date.now()
    }
  }

}
// output screen
class Screen {
  show(car, inTime) {
    console.log('车牌号', car.num)
    console.log('停车时间', Date.now() - inTime)
  }
}
// 
class Park {
  constructor(floors) {
    this.floors = floors || []
    this.camera = new Camera()
    this.screen = new Screen()
    this.carList = {}
  }
  in(car) {

  }
  out(car) {

  }
  emptyNum() {
    return this.floors.map(floor => {
      return `${floor.index}层还有${floor.emptyPlaceNum()} 个车位`
    }).join('\n')
  }
}
// layer
class Floors {
  constructor(index, places) {
    this.index = index
    this.places = places || []
  }
  emptyPlaceNum() {
    let num = 0
    this.places.forEach(p => {
      if (p.empty) {
        num = num + 1
      }
    })
    return num
  }
}
class Place {
  constructor() {
    this.empty = true
  }
  in () {
    this.empty = false
  }
  out() {
    this.empty = true
  }
}

// test code

const floors = []
for (let i = 0; i < 3; i++) {
  const places = []
  for (let j = 0; j < 100; j++) {
    places[j] = new Place()
  }
  floors[i] = new Floors(i+1, places)
}
const park = new Park(floors)