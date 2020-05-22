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
        logData: function () {
            return data;
        }
    }
    
})();


// UI CONTROLLER //
const UICtrl = (function () {
    

    // public method
    return {

    }
})();


// APP CONTROLLER //
const App = (function (ItemCtrl, UICtrl) {
    
    // initialiser for the app (public methods)
    return {
        init: function () {
            console.log('initialise app....')
        }
    }

})(ItemCtrl, UICtrl);


// initialise app
App.init()