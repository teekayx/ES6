describe('Calculator', function(){
    
    var calc;
    
    beforeEach(function(){
        calc = new Calculator();
        
        jasmine.addMatchers({
            tobeEvenNumber : function(util,customEqualityTesters){
                return {
                    compare: function(actual){
                        var passed = actual % 2 == 0;
                        return {
                            pass: passed,
                            message: 'Expected '+ actual + (passed? '': ' not') + 'to be even'
                        };
                    }
                };
            }
        });
    });
    
    it('should be able to add 1 and 2', function(){
        expect(calc.add(2,1)).toBe(3);
    });
    
    it('should not be able to subtract 5 from 3', function(){
        expect(calc.subtract(3,5)).not.toBeGreaterThan(0);
    });
    
    it('multiplies commutatively', function(){
        expect(calc.multiply(10,5)).toBe(calc.multiply(5,10));
    });
    
    it('should tell even numbers', function(){
        expect(calc.divide(16,2)).tobeEvenNumber();
    });
});