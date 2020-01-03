var budgetCalc = (function() {
	
	var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalInc) {
    
        if(totalInc > 0){
          this.percentage = Math.round((this.value / totalInc)*100);
        }
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };
    
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };


    var calculateTotal = function(type) {
        var total = 0;
        data.allItems[type].forEach(function(cur) {
            total += cur.value;
        });
        data.totals[type] = total;
    };

    var data = {
        allItems : {
            exp : [],
            inc : []
        },
        totals: {
            exp : 0,
            inc : 0
        },
        budget: 0,
        percentage: -1
    };

     return {
        addItem : function(type, description, val){
            var item;
            var ID = 10;
            
            //generate new id
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            if(type === 'exp'){
                item = new Expense(ID, description, val);
            } else if(type === 'inc'){
                item = new Income(ID, description, val);
            }
            data.allItems[type].push(item);
            return item;
        },

        deleteItem: function(type, id) {
            
            var ids = data.allItems[type].map(function(curr){
                return curr.id;
            });

            index = ids.indexOf(id);
            if(index !== -1) {
                data.allItems[type].splice(index,1);
            }
        },
        calulateBudget : function() {
           
            //calc total exp and inc
            calculateTotal('inc');
            calculateTotal('exp');
            
            //calc budget
            data.budget = data.totals.inc - data.totals.exp;
            //calc percentage of income spent
            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }else{
                data.percentage = -1;
            }
        },

        calculatePercentages: function() {
            data.allItems.exp.forEach(function(curr){
                curr.calcPercentage(data.totals.inc);
            });
        },
        getPercentages: function() {
            var percentages = data.allItems.exp.map(function(curr) {
                return curr.getPercentage();
            });
            return percentages;
        },
        getBudget : function() {
            return {
                budget : data.budget,
                totalInc : data.totals.inc,
                totalExp : data.totals.exp,
                percentage : data.percentage
            };
        },
    };

})();

var UiController = (function() {

    var DomSelectors = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercentages : '.item__percentage',
        dateLabel : '.budget__title--month'
    };

})();

var AppController = (function(budgetCtrl, UICtrl) {

    
    var eventListeners = function() {
 
        var DOM = UICtrl.getDomSelectors();
 
        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {

            if(event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
            }
         });

         document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

         document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);
    };

})(budgetCalc,UiController);