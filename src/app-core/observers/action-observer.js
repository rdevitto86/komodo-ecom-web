//TODO - determine enforcer method vs Object.freeze method
//TODO - determine if a singleton is even needed + storage in Redux?

// const _singleton_private = new Symbol();
// const _singleton_enforcer = new Symbol();

/**
 * @class StateObserver
 * @description - singleton object
 */
class ActionObserver {
    /**
     * @constructor
     * @description - creates a singleton instance of the action obsserver
     * @returns {ActionObserver}
     */
    constructor() {
        if(!ActionObserver.instance) {
            //persisted actions events
            let _mapPersistent = {
                categories: {}
            }; 
            //single-use events
            let _mapTemporary = {
                categories: {}
            }; 

            /**
             * @public
             * @function ActionObserver#subscribe
             * @description - adds a new persisted action broadcast event
             * @param {Object} event - action event to subscribe
             * @param {Boolean} useOnce - denotes persistent vs single use events
             * @param {String} category - organizes event into category
             */
            this.subscribe = (event = undefined, useOnce = false, category = undefined) => {
                if (typeof event === 'object' && event !== null) {
                    const title = event.title; //event name

                    if (Boolean(title) && typeof event.action === 'function') {
                        //flag to add event title to category list
                        const hasCategory = Boolean(category);

                        //check if event is persistent-use or not
                        if (useOnce !== true) {
                            _mapPersistent[title] = event.action; //update action

                            //add optional category identifier
                            if (hasCategory) {
                                //add new category list
                                if (!_mapPersistent.categories[category]) {
                                    _mapPersistent.categories[category] = [];
                                }
                                _mapPersistent.categories[category].push(title);
                            }
                        } else {
                            _mapTemporary[title] = event.action; //update action

                            //add optional category identifier
                            if (hasCategory) {
                                //add new category list
                                if (!_mapTemporary.categories[category]) {
                                    _mapTemporary.categories[category] = [];
                                }
                                _mapTemporary.categories[category].push(title);
                            }
                        }
                    } else {
                        //TODO - LOGGER.error()
                    }
                } else {
                    //TODO - LOGGER.warn()
                }
            };

            /**
             * @public
             * @function ActionObserver#unsubscribe
             * @description - removes a subscribed action
             * @param {Any} title - action event identifier
             */
            this.unsubscribe = (title) => {
                if(_mapPersistent[title]) {
                    delete _mapPersistent[title];
                } else if(_mapTemporary[title]) {
                    delete _mapTemporary[title];
                } else {
                    // LOGGER.warn();
                }
            };

            /**
             * @public
             * @function ActionObserver#unsubscribeAll
             * @description - removes all subscribed actions
             */
            this.unsubscribeAll = () => {
                _mapPersistent = { categories: {} };
                _mapTemporary = { categories: {} };
            };

            /**
             * @public
             * @function ActionObserver#broadcast
             * @description - executes a stored action for a given event title
             * @param {Any} title - action event identifier
             */
            this.broadcast = (title = undefined) => {
                if(_mapPersistent[title]) {
                    (_mapPersistent[title])(); //execute
                } else if(_mapTemporary[title]) {
                    (_mapTemporary[title])(); //execute
                    delete _mapTemporary[title]; //remove single-use action
                } else {
                    // LOGGER.warn()
                }
            };

            /**
             * @public
             * @function ActionObserver#broadcastCategory
             * @description - executes all action events for a given category
             * @param {Any} category - category identifier
             */
            this.broadcastCategory = (category = undefined) => {
                const p_category = _mapPersistent[category];
                const t_category = _mapTemporary[category];

                if(p_category) {
                    let i = p_category.length;
                    while(i--) {
                        this.broadcast(p_category[i]);
                    }
                } else if(t_category) {
                    let i = t_category.length;
                    while(i--) {
                        this.broadcast(t_category[i]);
                    }
                } else {
                    // LOGGER.warn()
                }
            };

            //set singleton instance
            ActionObserver.instance = this;
        }
        //returns singleton instance object
        return ActionObserver.instance;
    };
}

const instance = new ActionObserver();
Object.freeze(instance);

export default instance;