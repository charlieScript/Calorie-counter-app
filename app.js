// STORAGE CONTROLLER //


// ITEM CONTROLLER //
const ItemCtrl = (function () {
    // item constrctor
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // DATA STRUCTURE / STATE
    const data = {
        items: [
            {id: 0, name: 'Rice and Beans', calories: 1200},
            {id: 1, name: 'Bread', calories: 400},
            {id: 2, name: 'Egg', calories: 300}
        ],
        currentItem: null,
        totalCalories: 0
    }

    // public data
    return {
        getItems: function () {
            return data.items;
        },
        logData: function () {
            return data;
        }
    }
    
})();


// UI CONTROLLER //
const UICtrl = (function () {
    // ui selectors (object)
    const UIselectors = {
        itemList: '#item-list'
    }

    // public method
    return {
        populateItemList: function (items) {
            // loop throght the items and make them into a list
            let html = '';

            items.forEach(i => {
                html += `<li class="collection-item" id="item-${i.id}">
                <strong>${i.name}: </strong> <em>${i.calories} Calories</em>
                <a href="#" class="secondary-content">
                  <i class="edit-item fa fa-pencil"></i>
                </a>
              </li>`
            });

            // insert list item
            document.querySelector(UIselectors.itemList).innerHTML = html;
        }
    }
})();


// APP CONTROLLER //
const App = (function (ItemCtrl, UICtrl) {
    
    // initialiser for the app (public methods)
    return {
        init: function () {
            console.log('initialise app....');

            // fetch items from data structure
            const item = ItemCtrl.getItems();

            //populate items list 
            UICtrl.populateItemList(item)
        }
    }

})(ItemCtrl, UICtrl);


// initialise app
App.init()