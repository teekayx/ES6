describe("ES6 features",function(){
    
    describe("rest parameters", function(){
        it("can accept unknown no. of arguments in function definition", function(){
            let sum = function(...numbers){
                let result = 0;
           
                for(i=0;i<numbers.length;i++){
                    result+= numbers[i];
                }
            return result;
            }; 
        
            let total = sum(2,3,4);
        
            expect(total).toEqual(9);
        });
        
        it("can also be used along with positional arguments", function(){
            
            let doWork = function(name,...numbers){
                
                let result = 0;
                numbers.forEach(function(n){
                    result += n;
                });
                
                return result;
            };
            
            let result = doWork("Teekay",3,4,5);
            
            expect(result).toEqual(12);
        });
    });

    
    describe("...spread", function(){
        it("should be able to pass function parameters in format (...[]) to a function",function(){
            let doWork = function(x,y,z){
                return x+y+z;
            } 
            var result = doWork(...[1,2,3]);
       
            expect(result).toBe(6);
        }); 

        it("can build arrays", function(){
            var a = [4,5,6];
            var b = [1,2,3,...a,7,8,9];
        
            expect(b).toEqual([1,2,3,4,5,6,7,8,9]);
        });
             
    });
    
    describe("destructuring in ES6", function(){
        it("can destructure arrays", () => {
            let x = 2;
            let y = 3;
            function doWork() {
                return [3,1,2];
            }
            
//          [x,y] = [y,x];
//          [x,y] = [3,2];
            
            [x,,y,z] = doWork();
            
            expect(x).toBe(3);
            expect(y).toBe(2);
            expect(x).toBeUndefined;
        });
        
        it("can destructure objects", () => {
            
            function doWork(){
                return {
                    firstName : 'thulasi',
                    lastName : 'krishnan',
                    handle: {
                        twitter: '@tkrishnan',
                        facebook : 'thulsikrishnan',
                        linkedin: 'thulasikrishnan'
                    }
                };
            };
            
            let {
                firstName: fName,
                lastName,
                handle: {
                    twitter,
                    }
                }                   = doWork();
            
            expect(fName).toBe('thulasi');
            expect(lastName).toBe('krishnan');
            expect(twitter).toBe('@tkrishnan');
        });
        
        it("works with parameters",()=>{
            
            let doWork = (url, {data, cache})=> {
                return data; 
            }
            
            let result = doWork(
                'api/test', {
                    data : "Test",
                    cache: false
            });
            
            expect(result).toBe('Test');
        });
 
    });
    
    describe("const and let", () => {
        it("can shadow outer variable declarations", ()=>{
            let x = 12;
            
            () => {
                var x = 10;
                expect(x).toBe(10);
                return 10;
            }
            expect(x).toBe(12);
        });
    });
    
    describe("iterables", function(){
        it("can work with iterators at a low level", function(){
            let sum=0;
            let numbers = [1,2,3,4];
            
            for(let i=0; i<numbers.length;i++){
                sum+=numbers[i];
            }
            
            expect(sum).toBe(10);
            
            sum=0;
            for(let i in numbers){
                sum+=numbers[i];
            }
            
            expect(sum).toBe(10);
            
            sum = 0;
            
            let iterator = numbers[Symbol.iterator]();
            let next = iterator.next();
            while (!next.done){
                sum += next.value;
                next = iterator.next();
            }            
            expect(sum).toBe(10);
        });
    
        it("can be used with for...of construct to navigate only through values not the indexes/keys", function(){
            
            let arr = [1,2,3,4,5];
            let sum = 0; 
            for(let val of arr){
                sum+= val;
               }
            
            expect(sum).toBe(15);
        });
        
        it("can be custom built", function(){
           class Company {
               constructor(){
                   this.employees=[];
               }
               
               addEmployees(...names){
                   this.employees = this.employees.concat(names);
               }
               
               [Symbol.iterator](){
                   return new ArrayIterator(this.employees);
               }
           } 
           
           class ArrayIterator {
                constructor(array){
                    this.array = array;
                    this.index = 0;
                }
            
                next(){
                    let result = {values: undefined, done: true};
                    if(this.index < this.array.length){
                        result.value = this.array[this.index];
                        result.done = false;
                        this.index += 1;
                    }
                    return result;
                }            
            }
        
            let count = 0;
            let company = new Company();
            company.addEmployees("Tom","Dick","Harry");
        
            for(let emp of company){
                count += 1;
            }
            
            expect(count).toBe(3);
        });
        
        it("includes generator functions that can build an iterable", function(){
            let numbers = function*(start, end){
//                yield 1;
//                yield 2;
//                yield 3;
//                yield 4;
//                yield 5;
                for(i=start;i<=end;i++){
                    yield i;
                }
            }
            
            let sum = 0;
//            let iterator = numbers(1,5);
//            let next = iterator.next();
//            
//            while(!next.done){
//                sum += next.value;
//                next = iterator.next();
//            }
            for(n of numbers(1,5)){
                sum += n;
            }
            
            expect(sum).toBe(15);
        });

        it("can use generators too to build custom iterables", function(){
            class Company {
               constructor(){
                   this.employees=[];
               }
               
               addEmployees(...names){
                   this.employees = this.employees.concat(names);
               }
               
               *[Symbol.iterator](){
                   for(let e of this.employees){
                       console.log(e);
                       yield e;
                   }
               }
            }
           
            let filter = function*(items, predicate){
                for(item of items){
                    console.log("filter: ",item);
                    if(predicate(item)){
                        yield item;
                    }
                }
            }

            let take = function*(items, number){
                let count = 0;
                if(number<1){
                    return;
                }
                for(item of items){
                    console.log("take: ", item);
                    yield item;
                    count += 1;
                    if(count >= number){
                        return;
                    }
                }
            }
            let count = 0;
            let company = new Company();
            company.addEmployees("Tom","Dick","Harry","Tim");
        
            for(let emp of take(filter(company, e => e[0] == "T"),1)){
                count += 1;
            }
            
            expect(count).toBe(1);

        });
    });  
});