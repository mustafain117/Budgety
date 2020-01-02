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

})();

var UiController = (function() {

})();

var AppController = (function(budgetCtrl, UICtrl) {

})(budgetCalc,UiController);