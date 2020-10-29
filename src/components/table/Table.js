import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
import { $ } from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(20)
  }
  onMousedown(event) {
    if (event.target.dataset.resize) {
      console.log('start resize', event.target.dataset.resize)
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coords = $parent.getCoords()

      document.onmousemove = e => {
        if (event.target.dataset.resize === 'col') {
          const delta = e.pageX - coords.right
          const value = coords.width + delta
          $parent.$el.style.width = value + 'px'
        } else {
          const delta = e.pageY - coords.bottom
          const value = coords.height + delta
          $parent.$el.style.height = value + 'px'
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }
}
