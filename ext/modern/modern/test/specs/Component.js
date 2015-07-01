describe('Ext.Component', function() {
    var component;

    function makeComponent(config) {
        return component = new Ext.Component(config);
    }

    var hasCls = function(cls) {
        if (component) {
            var compCls = component.getCls() || [];

            return compCls.indexOf(cls) != -1;
        }

        return false;
    };

    var elHasCls = function(cls) {
        var el = component.element;

        return el.hasCls(cls);
    };

    afterEach(function() {
        component = Ext.destroy(component);
    });

    describe("bind", function() {
        describe("defaultBindProperty", function() {
            it("should bind with a string", function() {
                makeComponent({
                    renderTo: Ext.getBody(),
                    viewModel: {
                        data: {
                            theHtml: 'foo'
                        }
                    },
                    bind: '{theHtml}'
                });
                component.getViewModel().notify();
                expect(component.getInnerHtmlElement().dom.innerHTML).toBe('foo');
            });

            it("should throw an exception if we have no default bind", function() {
                expect(function() {
                    makeComponent({
                        defaultBindProperty: '',
                        viewModel: {
                            data: {
                                theHtml: 'foo'
                            }
                        },
                        bind: '{theHtml}'
                    });
                    component.getBind();
                }).toThrow();
                
                // The caught exception above was thrown after the component was
                // constructed and registered with ComponentManager, so we have to clean up
                Ext.ComponentMgr.clearAll();
            });
        });
    });

    describe("'cls' methods", function() {
        var spy;

        describe("configuration", function() {
            it("should convert a string into an array", function() {
                makeComponent({
                    cls: 'one'
                });

                expect(component.getCls()).toEqual(['one']);
            });

            it("should accept an array", function() {
                makeComponent({
                    cls: ['one', 'two']
                });

                expect(component.getCls()).toEqual(['one', 'two']);
            });
        });

        /**
         * Ext.Component#addCls
         */
        describe("addCls", function() {
            beforeEach(function() {
                makeComponent();
                spy = spyOn(component, "updateCls");
            });

            describe("no prefix/suffix", function() {
                it("should convert the cls to an array and add it to the component", function() {
                    component.addCls('one');
                    expect(spy).wasCalledWith(['one'], null);
                    expect(component.getCls()).toEqual(['one']);

                    component.addCls('two');
                    expect(spy).wasCalledWith(['one', 'two'], ['one']);
                    expect(component.getCls()).toEqual(['one', 'two']);
                });

                it("should add each of the cls to the component", function() {
                    component.addCls(['one', 'two']);
                    expect(spy).wasCalledWith(['one', 'two'], null);
                    expect(component.getCls()).toEqual(['one', 'two']);

                    component.addCls(['two', 'three']);
                    expect(spy).wasCalledWith(['one', 'two', 'three'], ['one', 'two']);
                    expect(component.getCls()).toEqual(['one', 'two', 'three']);
                });

                it("should allow for adding both strings and arrays", function() {
                    component.addCls('one');
                    expect(spy).wasCalledWith(['one'], null);
                    expect(component.getCls()).toEqual(['one']);

                    component.addCls(['two', 'three']);
                    expect(spy).wasCalledWith(['one', 'two', 'three'], ['one']);
                    expect(component.getCls()).toEqual(['one', 'two', 'three']);
                });

                it("should allow for adding both strings and arrays (reverse)", function() {
                    component.addCls(['two', 'three']);
                    expect(spy).wasCalledWith(['two', 'three'], null);
                    expect(component.getCls()).toEqual(['two', 'three']);

                    component.addCls('one');
                    expect(spy).wasCalledWith(['two', 'three', 'one'], ['two', 'three']);
                    expect(component.getCls()).toEqual(['two', 'three', 'one']);
                });
            });

            describe("prefix", function() {
                it("should convert the cls to an array and add it to the component", function() {
                    component.addCls('one', 'x-');
                    expect(spy).wasCalledWith(['x-one'], null);
                    expect(component.getCls()).toEqual(['x-one']);

                    component.addCls('two', 'x-');
                    expect(spy).wasCalledWith(['x-one', 'x-two'], ['x-one']);
                    expect(component.getCls()).toEqual(['x-one', 'x-two']);
                });

                it("should add each of the cls to the component", function() {
                    component.addCls(['one', 'two'], 'x-');
                    expect(spy).wasCalledWith(['x-one', 'x-two'], null);
                    expect(component.getCls()).toEqual(['x-one', 'x-two']);

                    component.addCls(['two', 'three'], 'x-');
                    expect(spy).wasCalledWith(['x-one', 'x-two', 'x-three'], ['x-one', 'x-two']);
                    expect(component.getCls()).toEqual(['x-one', 'x-two', 'x-three']);
                });

                it("should allow for adding both strings and arrays", function() {
                    component.addCls('one', 'x-');
                    expect(spy).wasCalledWith(['x-one'], null);
                    expect(component.getCls()).toEqual(['x-one']);

                    component.addCls(['two', 'three'], 'x-');
                    expect(spy).wasCalledWith(['x-one', 'x-two', 'x-three'], ['x-one']);
                    expect(component.getCls()).toEqual(['x-one', 'x-two', 'x-three']);
                });

                it("should allow for adding both strings and arrays (reverse)", function() {
                    component.addCls(['two', 'three'], 'x-');
                    expect(spy).wasCalledWith(['x-two', 'x-three'], null);
                    expect(component.getCls()).toEqual(['x-two', 'x-three']);

                    component.addCls('one', 'x-');
                    expect(spy).wasCalledWith(['x-two', 'x-three', 'x-one'], ['x-two', 'x-three']);
                    expect(component.getCls()).toEqual(['x-two', 'x-three', 'x-one']);
                });
            });

            describe("suffix", function() {
                it("should convert the cls to an array and add it to the component", function() {
                    component.addCls('one', null, '-y');
                    expect(spy).wasCalledWith(['one-y'], null);
                    expect(component.getCls()).toEqual(['one-y']);

                    component.addCls('two', null, '-y');
                    expect(spy).wasCalledWith(['one-y', 'two-y'], ['one-y']);
                    expect(component.getCls()).toEqual(['one-y', 'two-y']);
                });

                it("should add each of the cls to the component", function() {
                    component.addCls(['one', 'two'], null, '-y');
                    expect(spy).wasCalledWith(['one-y', 'two-y'], null);
                    expect(component.getCls()).toEqual(['one-y', 'two-y']);

                    component.addCls(['two', 'three'], null, '-y');
                    expect(spy).wasCalledWith(['one-y', 'two-y', 'three-y'], ['one-y', 'two-y']);
                    expect(component.getCls()).toEqual(['one-y', 'two-y', 'three-y']);
                });

                it("should allow for adding both strings and arrays", function() {
                    component.addCls('one', null, '-y');
                    expect(spy).wasCalledWith(['one-y'], null);
                    expect(component.getCls()).toEqual(['one-y']);

                    component.addCls(['two', 'three'], null, '-y');
                    expect(spy).wasCalledWith(['one-y', 'two-y', 'three-y'], ['one-y']);
                    expect(component.getCls()).toEqual(['one-y', 'two-y', 'three-y']);
                });

                it("should allow for adding both strings and arrays (reverse)", function() {
                    component.addCls(['two', 'three'], null, '-y');
                    expect(spy).wasCalledWith(['two-y', 'three-y'], null);
                    expect(component.getCls()).toEqual(['two-y', 'three-y']);

                    component.addCls('one', null, '-y');
                    expect(spy).wasCalledWith(['two-y', 'three-y', 'one-y'], ['two-y', 'three-y']);
                    expect(component.getCls()).toEqual(['two-y', 'three-y', 'one-y']);
                });
            });

            describe("prefix + suffix", function() {
                it("should convert the cls to an array and add it to the component", function() {
                    component.addCls('one', 'x-', '-y');
                    expect(spy).wasCalledWith(['x-one-y'], null);
                    expect(component.getCls()).toEqual(['x-one-y']);

                    component.addCls('two', 'x-', '-y');
                    expect(spy).wasCalledWith(['x-one-y', 'x-two-y'], ['x-one-y']);
                    expect(component.getCls()).toEqual(['x-one-y', 'x-two-y']);
                });

                it("should add each of the cls to the component", function() {
                    component.addCls(['one', 'two'], 'x-', '-y');
                    expect(spy).wasCalledWith(['x-one-y', 'x-two-y'], null);
                    expect(component.getCls()).toEqual(['x-one-y', 'x-two-y']);

                    component.addCls(['two', 'three'], 'x-', '-y');
                    expect(spy).wasCalledWith(['x-one-y', 'x-two-y', 'x-three-y'], ['x-one-y', 'x-two-y']);
                    expect(component.getCls()).toEqual(['x-one-y', 'x-two-y', 'x-three-y']);
                });

                it("should allow for adding both strings and arrays", function() {
                    component.addCls('one', 'x-', '-y');
                    expect(spy).wasCalledWith(['x-one-y'], null);
                    expect(component.getCls()).toEqual(['x-one-y']);

                    component.addCls(['two', 'three'], 'x-', '-y');
                    expect(spy).wasCalledWith(['x-one-y', 'x-two-y', 'x-three-y'], ['x-one-y']);
                    expect(component.getCls()).toEqual(['x-one-y', 'x-two-y', 'x-three-y']);
                });

                it("should allow for adding both strings and arrays (reverse)", function() {
                    component.addCls(['two', 'three'], 'x-', '-y');
                    expect(spy).wasCalledWith(['x-two-y', 'x-three-y'], null);
                    expect(component.getCls()).toEqual(['x-two-y', 'x-three-y']);

                    component.addCls('one', 'x-', '-y');
                    expect(spy).wasCalledWith(['x-two-y', 'x-three-y', 'x-one-y'], ['x-two-y', 'x-three-y']);
                    expect(component.getCls()).toEqual(['x-two-y', 'x-three-y', 'x-one-y']);
                });
            });
        });

        /**
         * Ext.Component#removeCls
         */
        describe("removeCls", function() {
            describe("no prefix/suffix", function() {
                describe("removing nothing", function() {
                    beforeEach(function() {
                        makeComponent();
                        spy = spyOn(component, "updateCls");
                    });

                    it("should do nothing", function() {
                        expect(component.getCls()).toEqual(null);

                        component.removeCls('one');

                        expect(component.getCls()).toEqual(null);
                    });
                });

                describe("removing single cls", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: 'one'
                        });
                        spy = spyOn(component, "updateCls");
                    });

                    it("should remove the cls (string)", function() {
                        expect(component.getCls()).toEqual(['one']);

                        component.removeCls('one');

                        expect(spy).wasCalledWith(null, ['one']);
                        expect(component.getCls()).toEqual(null);
                    });

                    it("should remove the cls (array)", function() {
                        expect(component.getCls()).toEqual(['one']);

                        component.removeCls(['one']);

                        expect(spy).wasCalledWith(null, ['one']);
                        expect(component.getCls()).toEqual(null);
                    });
                });

                describe("removing mulitple cls", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: ['one', 'two']
                        });
                        spy = spyOn(component, "updateCls");
                    });

                    it("should remove the cls (string)", function() {
                        expect(component.getCls()).toEqual(['one', 'two']);

                        component.removeCls('two');

                        expect(spy).wasCalledWith(['one'], ['one', 'two']);
                        expect(component.getCls()).toEqual(['one']);
                    });

                    it("should remove the cls (array)", function() {
                        expect(component.getCls()).toEqual(['one', 'two']);

                        component.removeCls(['one']);

                        expect(spy).wasCalledWith(['two'], ['one', 'two']);
                        expect(component.getCls()).toEqual(['two']);
                    });

                    it("should remove the cls (array, multiple)", function() {
                        expect(component.getCls()).toEqual(['one', 'two']);

                        component.removeCls(['one', 'two']);

                        expect(spy).wasCalledWith(null, ['one', 'two']);
                        expect(component.getCls()).toEqual(null);
                    });
                });
            });

            describe("prefix", function() {
                describe("removing nothing", function() {
                    beforeEach(function() {
                        makeComponent();
                    });

                    it("should do nothing", function() {
                        expect(component.getCls()).toEqual(null);

                        component.removeCls('one', 'x-');

                        expect(component.getCls()).toEqual(null);
                    });
                });

                describe("removing single cls", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: 'x-one'
                        });
                        spy = spyOn(component, "updateCls");
                    });

                    it("should remove the cls (string)", function() {
                        expect(component.getCls()).toEqual(['x-one']);

                        component.removeCls('one', 'x-');

                        expect(spy).wasCalledWith(null, ['x-one']);
                        expect(component.getCls()).toEqual(null);
                    });

                    it("should remove the cls (array)", function() {
                        expect(component.getCls()).toEqual(['x-one']);

                        component.removeCls(['one'], 'x-');

                        expect(spy).wasCalledWith(null, ['x-one']);
                        expect(component.getCls()).toEqual(null);
                    });
                });

                describe("removing mulitple cls", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: ['x-one', 'x-two']
                        });
                        spy = spyOn(component, "updateCls");
                    });

                    it("should remove the cls (string)", function() {
                        expect(component.getCls()).toEqual(['x-one', 'x-two']);

                        component.removeCls('two', 'x-');

                        expect(spy).wasCalledWith(['x-one'], ['x-one', 'x-two']);
                        expect(component.getCls()).toEqual(['x-one']);
                    });

                    it("should remove the cls (array)", function() {
                        expect(component.getCls()).toEqual(['x-one', 'x-two']);

                        component.removeCls(['one'], 'x-');

                        expect(spy).wasCalledWith(['x-two'], ['x-one', 'x-two']);
                        expect(component.getCls()).toEqual(['x-two']);
                    });

                    it("should remove the cls (array, multiple)", function() {
                        expect(component.getCls()).toEqual(['x-one', 'x-two']);

                        component.removeCls(['one', 'two'], 'x-');

                        expect(spy).wasCalledWith(null, ['x-one', 'x-two']);
                        expect(component.getCls()).toEqual(null);
                    });
                });
            });

            describe("suffix", function() {
                describe("removing nothing", function() {
                    beforeEach(function() {
                        makeComponent();
                    });

                    it("should do nothing", function() {
                        expect(component.getCls()).toEqual(null);

                        component.removeCls('one', null, '-y');

                        expect(component.getCls()).toEqual(null);
                    });
                });

                describe("removing single cls", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: 'one-y'
                        });
                        spy = spyOn(component, "updateCls");
                    });

                    it("should remove the cls (string)", function() {
                        expect(component.getCls()).toEqual(['one-y']);

                        component.removeCls('one', null, '-y');

                        expect(spy).wasCalledWith(null, ['one-y']);
                        expect(component.getCls()).toEqual(null);
                    });

                    it("should remove the cls (array)", function() {
                        expect(component.getCls()).toEqual(['one-y']);

                        component.removeCls(['one'], null, '-y');

                        expect(spy).wasCalledWith(null, ['one-y']);
                        expect(component.getCls()).toEqual(null);
                    });
                });

                describe("removing mulitple cls", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: ['one-y', 'two-y']
                        });
                        spy = spyOn(component, "updateCls");
                    });

                    it("should remove the cls (string)", function() {
                        expect(component.getCls()).toEqual(['one-y', 'two-y']);

                        component.removeCls('two', null, '-y');

                        expect(spy).wasCalledWith(['one-y'], ['one-y', 'two-y']);
                        expect(component.getCls()).toEqual(['one-y']);
                    });

                    it("should remove the cls (array)", function() {
                        expect(component.getCls()).toEqual(['one-y', 'two-y']);

                        component.removeCls(['one'], null, '-y');

                        expect(spy).wasCalledWith(['two-y'], ['one-y', 'two-y']);
                        expect(component.getCls()).toEqual(['two-y']);
                    });

                    it("should remove the cls (array, multiple)", function() {
                        expect(component.getCls()).toEqual(['one-y', 'two-y']);

                        component.removeCls(['one', 'two'], null, '-y');

                        expect(spy).wasCalledWith(null, ['one-y', 'two-y']);
                        expect(component.getCls()).toEqual(null);
                    });
                });
            });

            describe("prefix + suffix", function() {
                describe("removing nothing", function() {
                    beforeEach(function() {
                        makeComponent();
                    });

                    it("should do nothing", function() {
                        expect(component.getCls()).toEqual(null);

                        component.removeCls('one', 'x-', '-y');

                        expect(component.getCls()).toEqual(null);
                    });
                });

                describe("removing single cls", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: 'x-one-y'
                        });
                        spy = spyOn(component, "updateCls");
                    });

                    it("should remove the cls (string)", function() {
                        expect(component.getCls()).toEqual(['x-one-y']);

                        component.removeCls('one', 'x-', '-y');

                        expect(spy).wasCalledWith(null, ['x-one-y']);
                        expect(component.getCls()).toEqual(null);
                    });

                    it("should remove the cls (array)", function() {
                        expect(component.getCls()).toEqual(['x-one-y']);

                        component.removeCls(['one'], 'x-', '-y');

                        expect(spy).wasCalledWith(null, ['x-one-y']);
                        expect(component.getCls()).toEqual(null);
                    });
                });

                describe("removing mulitple cls", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: ['x-one-y', 'x-two-y']
                        });
                        spy = spyOn(component, "updateCls");
                    });

                    it("should remove the cls (string)", function() {
                        expect(component.getCls()).toEqual(['x-one-y', 'x-two-y']);

                        component.removeCls('two', 'x-', '-y');

                        expect(spy).wasCalledWith(['x-one-y'], ['x-one-y', 'x-two-y']);
                        expect(component.getCls()).toEqual(['x-one-y']);
                    });

                    it("should remove the cls (array)", function() {
                        expect(component.getCls()).toEqual(['x-one-y', 'x-two-y']);

                        component.removeCls(['one'], 'x-', '-y');

                        expect(spy).wasCalledWith(['x-two-y'], ['x-one-y', 'x-two-y']);
                        expect(component.getCls()).toEqual(['x-two-y']);
                    });

                    it("should remove the cls (array, multiple)", function() {
                        expect(component.getCls()).toEqual(['x-one-y', 'x-two-y']);

                        component.removeCls(['one', 'two'], 'x-', '-y');

                        expect(spy).wasCalledWith(null, ['x-one-y', 'x-two-y']);
                        expect(component.getCls()).toEqual(null);
                    });
                });
            });
        });

        /**
         * Ext.Component#setCls
         */
        describe("setCls", function() {
            describe("with no existing cls", function() {
                beforeEach(function() {
                    makeComponent();
                    spy = spyOn(component, "updateCls");
                });

                it("should set the cls (string)", function() {
                    expect(component.getCls()).toEqual(null);

                    component.setCls('one');

                    expect(spy).wasCalledWith(['one'], null);
                    expect(component.getCls()).toEqual(['one']);
                });

                it("should set the cls (array)", function() {
                    expect(component.getCls()).toEqual(null);

                    component.setCls(['one', 'two']);

                    expect(spy).wasCalledWith(['one', 'two'], null);
                    expect(component.getCls()).toEqual(['one', 'two']);
                });
            });

            describe("with existing cls (string)", function() {
                beforeEach(function() {
                    makeComponent({
                        cls: 'one'
                    });
                    spy = spyOn(component, "updateCls");
                });

                it("should set the cls (string)", function() {
                    expect(component.getCls()).toEqual(['one']);

                    component.setCls('two');

                    expect(spy).wasCalledWith(['two'], ['one']);
                    expect(component.getCls()).toEqual(['two']);
                });

                it("should set the cls (array)", function() {
                    expect(component.getCls()).toEqual(['one']);

                    component.setCls(['two', 'three']);

                    expect(spy).wasCalledWith(['two', 'three'], ['one']);
                    expect(component.getCls()).toEqual(['two', 'three']);
                });
            });

            describe("with existing cls (array)", function() {
                beforeEach(function() {
                    makeComponent({
                        cls: ['one', 'two']
                    });
                    spy = spyOn(component, "updateCls");
                });

                it("should set the cls (string)", function() {
                    expect(component.getCls()).toEqual(['one', 'two']);

                    component.setCls('three');

                    expect(spy).wasCalledWith(['three'], ['one', 'two']);
                    expect(component.getCls()).toEqual(['three']);
                });

                it("should set the cls (array)", function() {
                    expect(component.getCls()).toEqual(['one', 'two']);

                    component.setCls(['four', 'three']);

                    expect(spy).wasCalledWith(['four', 'three'], ['one', 'two']);
                    expect(component.getCls()).toEqual(['four', 'three']);
                });
            });
        });

        /**
         * Ext.Component#replaceCls
         */
        describe("replaceCls", function() {
            describe("no prefix/suffix", function() {
                describe("with no existing cls", function() {
                    beforeEach(function() {
                        makeComponent();
                        spy = spyOn(component, "updateCls");
                    });

                    it("should set the cls (string)", function() {
                        expect(component.getCls()).toEqual(null);

                        component.replaceCls('two', 'one');

                        expect(spy).wasCalledWith(['one'], null);
                        expect(component.getCls()).toEqual(['one']);
                    });

                    it("should set the cls (array)", function() {
                        expect(component.getCls()).toEqual(null);

                        component.replaceCls(['one', 'two'], ['three', 'four']);

                        expect(spy).wasCalledWith(['three', 'four'], null);
                        expect(component.getCls()).toEqual(['three', 'four']);
                    });
                });

                describe("with existing cls (string)", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: 'one'
                        });
                        spy = spyOn(component, "updateCls");
                    });

                    it("should replace the cls (string)", function() {
                        expect(component.getCls()).toEqual(['one']);

                        component.replaceCls('one', 'two');

                        expect(spy).wasCalledWith(['two'], ['one']);
                        expect(component.getCls()).toEqual(['two']);
                    });

                    it("should replace the cls (array)", function() {
                        expect(component.getCls()).toEqual(['one']);

                        component.replaceCls(['one'], ['two']);

                        expect(spy).wasCalledWith(['two'], ['one']);
                        expect(component.getCls()).toEqual(['two']);
                    });

                    it("should replace the cls (array, multiple)", function() {
                        expect(component.getCls()).toEqual(['one']);

                        component.replaceCls(['one'], ['two', 'three']);

                        expect(spy).wasCalledWith(['two', 'three'], ['one']);
                        expect(component.getCls()).toEqual(['two', 'three']);
                    });
                });

                describe("with existing cls (array)", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: ['one', 'two']
                        });
                        spy = spyOn(component, "updateCls");
                    });

                    it("should replace the cls (string)", function() {
                        expect(component.getCls()).toEqual(['one', 'two']);

                        component.replaceCls('one', 'three');

                        expect(spy).wasCalledWith(['two', 'three'], ['one', 'two']);
                        expect(component.getCls()).toEqual(['two', 'three']);
                    });

                    it("should replace the cls (array)", function() {
                        expect(component.getCls()).toEqual(['one', 'two']);

                        component.replaceCls(['one', 'two'], ['four', 'three']);

                        expect(spy).wasCalledWith(['four', 'three'], ['one', 'two']);
                        expect(component.getCls()).toEqual(['four', 'three']);
                    });
                });
            });

            describe("prefix", function() {
                describe("with no existing cls", function() {
                    beforeEach(function() {
                        makeComponent();
                        spy = spyOn(component, "updateCls");
                    });

                    it("should set the cls (string)", function() {
                        expect(component.getCls()).toEqual(null);

                        component.replaceCls('two', 'one', 'x-');

                        expect(spy).wasCalledWith(['x-one'], null);
                        expect(component.getCls()).toEqual(['x-one']);
                    });

                    it("should set the cls (array)", function() {
                        expect(component.getCls()).toEqual(null);

                        component.replaceCls(['one', 'two'], ['three', 'four'], 'x-');

                        expect(spy).wasCalledWith(['x-three', 'x-four'], null);
                        expect(component.getCls()).toEqual(['x-three', 'x-four']);
                    });
                });

                describe("with existing cls (string)", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: 'x-one'
                        });
                        spy = spyOn(component, "updateCls");
                    });

                    it("should replace the cls (string)", function() {
                        expect(component.getCls()).toEqual(['x-one']);

                        component.replaceCls('one', 'two', 'x-');

                        expect(spy).wasCalledWith(['x-two'], ['x-one']);
                        expect(component.getCls()).toEqual(['x-two']);
                    });

                    it("should replace the cls (array)", function() {
                        expect(component.getCls()).toEqual(['x-one']);

                        component.replaceCls(['one'], ['two'], 'x-');

                        expect(spy).wasCalledWith(['x-two'], ['x-one']);
                        expect(component.getCls()).toEqual(['x-two']);
                    });

                    it("should replace the cls (array, multiple)", function() {
                        expect(component.getCls()).toEqual(['x-one']);

                        component.replaceCls(['one'], ['two', 'three'], 'x-');

                        expect(spy).wasCalledWith(['x-two', 'x-three'], ['x-one']);
                        expect(component.getCls()).toEqual(['x-two', 'x-three']);
                    });
                });

                describe("with existing cls (array)", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: ['x-one', 'x-two']
                        });
                        spy = spyOn(component, "updateCls");
                    });

                    it("should replace the cls (string)", function() {
                        expect(component.getCls()).toEqual(['x-one', 'x-two']);

                        component.replaceCls('one', 'three', 'x-');

                        expect(spy).wasCalledWith(['x-two', 'x-three'], ['x-one', 'x-two']);
                        expect(component.getCls()).toEqual(['x-two', 'x-three']);
                    });

                    it("should replace the cls (array)", function() {
                        expect(component.getCls()).toEqual(['x-one', 'x-two']);

                        component.replaceCls(['one', 'two'], ['four', 'three'], 'x-');

                        expect(spy).wasCalledWith(['x-four', 'x-three'], ['x-one', 'x-two']);
                        expect(component.getCls()).toEqual(['x-four', 'x-three']);
                    });
                });
            });

            describe("suffix", function() {
                describe("with no existing cls", function() {
                    beforeEach(function() {
                        makeComponent();
                        spy = spyOn(component, "updateCls");
                    });

                    it("should set the cls (string)", function() {
                        expect(component.getCls()).toEqual(null);

                        component.replaceCls('two', 'one', null, '-y');

                        expect(spy).wasCalledWith(['one-y'], null);
                        expect(component.getCls()).toEqual(['one-y']);
                    });

                    it("should set the cls (array)", function() {
                        expect(component.getCls()).toEqual(null);

                        component.replaceCls(['one', 'two'], ['three', 'four'], null, '-y');

                        expect(spy).wasCalledWith(['three-y', 'four-y'], null);
                        expect(component.getCls()).toEqual(['three-y', 'four-y']);
                    });
                });

                describe("with existing cls (string)", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: 'one-y'
                        });
                        spy = spyOn(component, "updateCls");
                    });

                    it("should replace the cls (string)", function() {
                        expect(component.getCls()).toEqual(['one-y']);

                        component.replaceCls('one', 'two', null, '-y');

                        expect(spy).wasCalledWith(['two-y'], ['one-y']);
                        expect(component.getCls()).toEqual(['two-y']);
                    });

                    it("should replace the cls (array)", function() {
                        expect(component.getCls()).toEqual(['one-y']);

                        component.replaceCls(['one'], ['two'], null, '-y');

                        expect(spy).wasCalledWith(['two-y'], ['one-y']);
                        expect(component.getCls()).toEqual(['two-y']);
                    });

                    it("should replace the cls (array, multiple)", function() {
                        expect(component.getCls()).toEqual(['one-y']);

                        component.replaceCls(['one'], ['two', 'three'], null, '-y');

                        expect(spy).wasCalledWith(['two-y', 'three-y'], ['one-y']);
                        expect(component.getCls()).toEqual(['two-y', 'three-y']);
                    });
                });

                describe("with existing cls (array)", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: ['one-y', 'two-y']
                        });
                        spy = spyOn(component, "updateCls");
                    });

                    it("should replace the cls (string)", function() {
                        expect(component.getCls()).toEqual(['one-y', 'two-y']);

                        component.replaceCls('one', 'three', null, '-y');

                        expect(spy).wasCalledWith(['two-y', 'three-y'], ['one-y', 'two-y']);
                        expect(component.getCls()).toEqual(['two-y', 'three-y']);
                    });

                    it("should replace the cls (array)", function() {
                        expect(component.getCls()).toEqual(['one-y', 'two-y']);

                        component.replaceCls(['one', 'two'], ['four', 'three'], null, '-y');

                        expect(spy).wasCalledWith(['four-y', 'three-y'], ['one-y', 'two-y']);
                        expect(component.getCls()).toEqual(['four-y', 'three-y']);
                    });
                });
            });

            describe("prefix+suffix", function() {
                describe("with no existing cls", function() {
                    beforeEach(function() {
                        makeComponent();
                        spy = spyOn(component, "updateCls");
                    });

                    it("should set the cls (string)", function() {
                        expect(component.getCls()).toEqual(null);

                        component.replaceCls('two', 'one', 'x-', '-y');

                        expect(spy).wasCalledWith(['x-one-y'], null);
                        expect(component.getCls()).toEqual(['x-one-y']);
                    });

                    it("should set the cls (array)", function() {
                        expect(component.getCls()).toEqual(null);

                        component.replaceCls(['one', 'two'], ['three', 'four'], 'x-', '-y');

                        expect(spy).wasCalledWith(['x-three-y', 'x-four-y'], null);
                        expect(component.getCls()).toEqual(['x-three-y', 'x-four-y']);
                    });
                });

                describe("with existing cls (string)", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: 'x-one-y'
                        });
                        spy = spyOn(component, "updateCls");
                    });

                    it("should replace the cls (string)", function() {
                        expect(component.getCls()).toEqual(['x-one-y']);

                        component.replaceCls('one', 'two', 'x-', '-y');

                        expect(spy).wasCalledWith(['x-two-y'], ['x-one-y']);
                        expect(component.getCls()).toEqual(['x-two-y']);
                    });

                    it("should replace the cls (array)", function() {
                        expect(component.getCls()).toEqual(['x-one-y']);

                        component.replaceCls(['one'], ['two'], 'x-', '-y');

                        expect(spy).wasCalledWith(['x-two-y'], ['x-one-y']);
                        expect(component.getCls()).toEqual(['x-two-y']);
                    });

                    it("should replace the cls (array, multiple)", function() {
                        expect(component.getCls()).toEqual(['x-one-y']);

                        component.replaceCls(['one'], ['two', 'three'], 'x-', '-y');

                        expect(spy).wasCalledWith(['x-two-y', 'x-three-y'], ['x-one-y']);
                        expect(component.getCls()).toEqual(['x-two-y', 'x-three-y']);
                    });
                });

                describe("with existing cls (array)", function() {
                    beforeEach(function() {
                        makeComponent({
                            cls: ['x-one-y', 'x-two-y']
                        });
                        spy = spyOn(component, "updateCls");
                    });

                    it("should replace the cls (string)", function() {
                        expect(component.getCls()).toEqual(['x-one-y', 'x-two-y']);

                        component.replaceCls('one', 'three', 'x-', '-y');

                        expect(spy).wasCalledWith(['x-two-y', 'x-three-y'], ['x-one-y', 'x-two-y']);
                        expect(component.getCls()).toEqual(['x-two-y', 'x-three-y']);
                    });

                    it("should replace the cls (array)", function() {
                        expect(component.getCls()).toEqual(['x-one-y', 'x-two-y']);
                        component.replaceCls(['one', 'two'], ['four', 'three'], 'x-', '-y');

                        expect(spy).wasCalledWith(['x-four-y', 'x-three-y'], ['x-one-y', 'x-two-y']);
                        expect(component.getCls()).toEqual(['x-four-y', 'x-three-y']);
                    });
                });
            });
        });

        describe("toggleCls", function() {
            describe("add cls", function() {
                it("add to component's element", function() {
                    makeComponent();

                    component.toggleCls('one');

                    expect(component.element).toHaveCls('one');
                });

                it("add cls to component's cls cache", function() {
                    makeComponent();

                    component.toggleCls('one');

                    expect(hasCls('one')).toBe(true);
                });

                it("force add cls to component", function() {
                    makeComponent({
                        cls : 'one'
                    });

                    //normally since the component already has the cls it would remove
                    //but since we are passing `true`, it will force it to add
                    component.toggleCls('one', true);

                    expect(hasCls('one')).toBe(true);
                });
            });

            describe("remove cls", function() {
                it("remove from component's element", function() {
                    makeComponent({
                        cls : 'one'
                    });

                    component.toggleCls('one');

                    expect(component.element).not.toHaveCls('one');
                });

                it("remove cls from component's cls cache", function() {
                    makeComponent({
                        cls : 'one'
                    });

                    component.toggleCls('one');

                    expect(hasCls('one')).toBe(false);
                });
            });
        });
    });

    describe('setData call', function() {
        it("should convert a string into an array", function () {
            makeComponent({
                tpl : 'first name is {fname}'
            });

            component.setData({
                fname : null
            });

            expect(component.innerHtmlElement.dom.innerHTML).toEqual('first name is ');
        });
    });

    describe('destroy', function () {
        it("should fire the 'destroy' event", function () {
            var cmp = makeComponent({}),
                isFired;

            cmp.on('destroy', function () {
                isFired = true;
            });
            cmp.destroy();

            expect(isFired).toBe(true);
        });
    });

});
