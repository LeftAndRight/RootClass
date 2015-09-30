describe("RootClass test", function() {

	var Fruit, Apple;

	beforeEach(function(){
		Fruit = RootClass.extend({
			initialize: function(){
				this.ripe = true;
			},
			getName: function(){
				return "Fruit";
			}
		});

		Apple = Fruit.extend({
			getName: function(){
				return "Apple Fruit";
			}
		});
	});

	it("Test existence on window", function() {
		expect(window.RootClass).toBeDefined();
		expect(typeof window.RootClass).toBe("function");
	});

	it("Test overloading", function() {
		var fruit = new Fruit();
		var apple = new Apple();

		expect(fruit.getName()).toBe("Fruit");
		expect(apple.getName()).toBe("Apple Fruit");
	});

	it("Test initialize", function() {
		var fruit = new Fruit();
		expect(fruit.ripe).toBe(true);
	});
});