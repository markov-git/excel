export class TableSelection {
    static className = 'selected'

    constructor() {
        this.group = []
        this.current = null
    }


    // $el instanceOf DOM -> true
    select($el) {
        this.clear()
        $el.focus().addClass(TableSelection.className)
        this.group.push($el)
        this.current = $el
    }

    selectGroup($group){
        this.clear()

        this.group = $group
        this.group.forEach($el=> $el.addClass(TableSelection.className))
    }

    clear() {
        this.group.forEach($el=> $el.removeClass(TableSelection.className))
        this.group = []
    }
}