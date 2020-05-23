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
            // {id: 0, name: 'Rice and Beans', calories: 1200},
            // {id: 1, name: 'Bread', calories: 400},
            // {id: 2, name: 'Egg', calories: 300}
        ],
        currentItem: null,
        totalCalories: 0
    }

    // public data
    return {
        getItems: function () {
            return data.items;
        },
        addItem: function (name, calories) {
            let ID;
            // generate iDs 
            if (data.items > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // parse calories as number
            calories = parseInt(calories);

            // create new Item
            let newItem = new Item(ID, name, calories);

            // add new item to array
            data.items.push(newItem)

            return newItem;
        },
        getTotalCalories: function (params) {
            let total = 0;

            // loop and total calories
            data.items.forEach(function (items) {
                total += items.calories;
            });

            // set total cal in data strucure
            data.totalCalories = total;

            // return total
            return total;
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
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
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
        },
        getItemInput: function () {
            return {
                name: document.querySelector(UIselectors.itemNameInput).value,
                calories: document.querySelector(UIselectors.itemCaloriesInput).value
            }
        },
        addListItem: function(item) {
            //show the list
            document.querySelector(UIselectors.itemList).style.display = 'block';
            // create li elemnt
            const li = document.createElement('li');
            li.className = 'collection-item'
            li.id = `item-${item.id}`;
            li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>`;
            // insert item
            document.querySelector(UIselectors.itemList).insertAdjacentElement('beforeend', li)
        },
        clearInput: function(){
            document.querySelector(UIselectors.itemNameInput).value = '';
            document.querySelector(UIselectors.itemCaloriesInput).value = '';
        },
        hideList: function(){
            document.querySelector(UIselectors.itemList).style.display = 'none';
        },
        showTotalCalories: function(totalCalories) {
            document.querySelector(UIselectors.totalCalories).textContent = totalCalories;
        },
        getSelectors: function() {
            return UIselectors;
        }

    }
})();


// APP CONTROLLER //
const App = (function (ItemCtrl, UICtrl) {
    // load event listerners
    const loadEventListerners = function() {
        const UIselectors = UICtrl.getSelectors();

        // add item event 
        document.querySelector(UIselectors.addBtn).addEventListener('click', itemAddSubmit)
    }

    // add item submit
    const itemAddSubmit = function (e) {
        // get form input from ui controller
        const input = UICtrl.getItemInput();

        // check for name and calorie input
        if (input.name !== '' && input.calories !== '')  {
            // add item 
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            // add item to UI list
            UICtrl.addListItem(newItem);

            // get total
            const totalCalories = ItemCtrl.getTotalCalories();

            // add total calories to UI
            UICtrl.showTotalCalories(totalCalories)

            // clear fields
            UICtrl.clearInput();

        }

        e.preventDefault();
    }

    // initialiser for the app (public methods)
    return {
        init: function () {
            // fetch items from data structure
            const item = ItemCtrl.getItems();

            // chek if any items
            if (item.length === 0) {
                UICtrl.hideList();
            } else {
                //populate items list 
                 UICtrl.populateItemList(item)
            }

            // add item to UI list
            UICtrl.addListItem(newItem);

            // get total
            const totalCalories = ItemCtrl.getTotalCalories();
            
            // loadeventlisterners
            loadEventListerners()
        }
    }

})(ItemCtrl, UICtrl);


// initialise app
App.init()