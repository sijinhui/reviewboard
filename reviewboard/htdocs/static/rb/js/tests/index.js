(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('@beanbag/jasmine-suites'), require('jasmine-core'), require('@beanbag/spina')) :
    typeof define === 'function' && define.amd ? define(['@beanbag/jasmine-suites', 'jasmine-core', '@beanbag/spina'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.window, global.window, global.Spina));
})(this, (function (jasmineSuites, jasmineCore, spina) { 'use strict';

    jasmineSuites.suite('rb/models/CommChannel', () => {
      let commChannel;
      jasmineCore.beforeEach(() => {
        commChannel = new RB.ClientCommChannel();
      });
      jasmineCore.afterEach(() => {
        commChannel.close();
      });
      jasmineCore.describe('reload handler', () => {
        let pageView;
        jasmineCore.beforeEach(() => {
          const $body = $('<div>').appendTo($testsScratch);
          const $headerBar = $('<div>').appendTo($body);
          const $pageContainer = $('<div>').appendTo($body);
          const $pageContent = $('<div>').appendTo($pageContainer);
          const $pageSidebar = $('<div>').appendTo($body);
          pageView = new RB.PageView({
            $body: $body,
            $headerBar: $headerBar,
            $pageContainer: $pageContainer,
            $pageContent: $pageContent,
            $pageSidebar: $pageSidebar
          });
          jasmineCore.spyOn(RB.PageManager, 'getPage').and.returnValue(pageView);
        });
        jasmineCore.it('With matching reload data', () => {
          jasmineCore.spyOn(pageView, 'getReloadData').and.returnValue({
            test: 1
          });
          let gotSignal = false;
          commChannel.on('reload', () => {
            gotSignal = true;
          });
          commChannel._onReload({
            data: {
              test: 1
            },
            event: 'reload'
          });
          jasmineCore.expect(pageView.getReloadData).toHaveBeenCalled();
          jasmineCore.expect(gotSignal).toBe(true);
        });
        jasmineCore.it('Without matching reload data', () => {
          jasmineCore.spyOn(pageView, 'getReloadData').and.returnValue({
            test: 2
          });
          commChannel.on('reload', () => {
            jasmineCore.fail();
          });
          commChannel._onReload({
            data: {
              test: 1
            },
            event: 'reload'
          });
          jasmineCore.expect(pageView.getReloadData).toHaveBeenCalled();
        });
      });
    });

    jasmineSuites.suite('rb/models/ExtraData', function () {
      let model;
      jasmineCore.describe('With Backbone.Model.extend', function () {
        jasmineCore.beforeEach(function () {
          const Resource = Backbone.Model.extend(_.defaults({
            defaults() {
              return {
                extraData: {}
              };
            },
            initialize() {
              this._setupExtraData();
            }
          }, RB.ExtraDataMixin));
          model = new Resource();
        });
        jasmineCore.it('change events fired', function () {
          const callbacks = {
            'change': function () {},
            'change:extraData': function () {}
          };
          jasmineCore.spyOn(callbacks, 'change');
          jasmineCore.spyOn(callbacks, 'change:extraData');
          model.on('change', callbacks.change);
          model.on('change:extraData', callbacks['change:extraData']);
          model.setExtraData('foo', 1);
          jasmineCore.expect(callbacks.change).toHaveBeenCalled();
          jasmineCore.expect(callbacks['change:extraData']).toHaveBeenCalled();
        });
        jasmineCore.it('attributes updated', function () {
          const oldExtraData = model.attributes.extraData;
          jasmineCore.expect(model.extraData.attributes).toBe(oldExtraData);
          model.set({
            extraData: {
              foo: 1
            }
          });
          jasmineCore.expect(model.attributes.extraData).toEqual({
            foo: 1
          });
          jasmineCore.expect(model.extraData.attributes).toEqual({
            foo: 1
          });
          jasmineCore.expect(model.extraData.attributes).not.toBe(oldExtraData);
          jasmineCore.expect(model.attributes.extraData).not.toBe(oldExtraData);
          jasmineCore.expect(model.extraData.attributes).toBe(model.attributes.extraData);
        });
      });
      jasmineCore.describe('With spina BaseModel', function () {
        jasmineCore.beforeEach(function () {
          var _dec, _class;
          let Resource = (_dec = spina.spina({
            mixins: [RB.ExtraDataMixin]
          }), _dec(_class = class Resource extends spina.BaseModel {
            static defaults() {
              return {
                extraData: {}
              };
            }
            initialize() {
              this._setupExtraData();
            }
          }) || _class);
          model = new Resource();
        });
        jasmineCore.it('change events fired', function () {
          const callbacks = {
            'change': function () {},
            'change:extraData': function () {}
          };
          jasmineCore.spyOn(callbacks, 'change');
          jasmineCore.spyOn(callbacks, 'change:extraData');
          model.on('change', callbacks.change);
          model.on('change:extraData', callbacks['change:extraData']);
          model.setExtraData('foo', 1);
          jasmineCore.expect(callbacks.change).toHaveBeenCalled();
          jasmineCore.expect(callbacks['change:extraData']).toHaveBeenCalled();
        });
        jasmineCore.it('attributes updated', function () {
          const oldExtraData = model.attributes.extraData;
          jasmineCore.expect(model.extraData.attributes).toBe(oldExtraData);
          model.set({
            extraData: {
              foo: 1
            }
          });
          jasmineCore.expect(model.attributes.extraData).toEqual({
            foo: 1
          });
          jasmineCore.expect(model.extraData.attributes).toEqual({
            foo: 1
          });
          jasmineCore.expect(model.extraData.attributes).not.toBe(oldExtraData);
          jasmineCore.expect(model.attributes.extraData).not.toBe(oldExtraData);
          jasmineCore.expect(model.extraData.attributes).toBe(model.attributes.extraData);
        });
      });
    });

    jasmineSuites.suite('rb/models/UserSession', function () {
      jasmineCore.describe('create', function () {
        jasmineCore.it('Instance is set', function () {
          RB.UserSession.instance = null;
          const session = RB.UserSession.create({
            username: 'testuser'
          });
          jasmineCore.expect(session).toBe(RB.UserSession.instance);
        });
        jasmineCore.it('Second attempt fails', function () {
          RB.UserSession.instance = null;
          RB.UserSession.create({
            username: 'testuser'
          });
          jasmineCore.expect(console.assert).toHaveBeenCalled();
          jasmineCore.expect(console.assert.calls.argsFor(0)[0]).toBeTruthy();
          jasmineCore.expect(() => RB.UserSession.create({
            username: 'foo'
          })).toThrow();
          jasmineCore.expect(console.assert).toHaveBeenCalled();
          jasmineCore.expect(console.assert.calls.argsFor(1)[0]).toBeFalsy();
        });
      });
      jasmineCore.describe('Attributes', function () {
        let session;
        jasmineCore.beforeEach(function () {
          session = RB.UserSession.instance;
        });
        jasmineCore.describe('diffsShowExtraWhitespace', function () {
          jasmineCore.describe('Loads from cookie', function () {
            jasmineCore.it('When "true"', function () {
              jasmineCore.spyOn($, 'cookie').and.returnValue('true');
              RB.UserSession.instance = null;
              session = RB.UserSession.create({
                username: 'testuser'
              });
              jasmineCore.expect($.cookie).toHaveBeenCalledWith('show_ew');
              jasmineCore.expect(session.get('diffsShowExtraWhitespace')).toBe(true);
            });
            jasmineCore.it('When "false"', function () {
              jasmineCore.spyOn($, 'cookie').and.returnValue('false');
              RB.UserSession.instance = null;
              session = RB.UserSession.create({
                username: 'testuser'
              });
              jasmineCore.expect($.cookie).toHaveBeenCalledWith('show_ew');
              jasmineCore.expect(session.get('diffsShowExtraWhitespace')).toBe(false);
            });
          });
          jasmineCore.describe('Sets cookie', function () {
            jasmineCore.beforeEach(function () {
              jasmineCore.spyOn($, 'cookie');
            });
            jasmineCore.it('When true', function () {
              session.attributes.diffsShowExtraWhitespace = false;
              session.set('diffsShowExtraWhitespace', true);
              jasmineCore.expect($.cookie).toHaveBeenCalledWith('show_ew', 'true', {
                path: SITE_ROOT
              });
            });
            jasmineCore.it('When false', function () {
              session.attributes.diffsShowExtraWhitespace = true;
              session.set('diffsShowExtraWhitespace', false);
              jasmineCore.expect($.cookie).toHaveBeenCalledWith('show_ew', 'false', {
                path: SITE_ROOT
              });
            });
          });
        });
      });
    });

    jasmineSuites.suite('rb/resources/collections/ResourceCollection', function () {
      let collection;
      let reviewRequest;
      jasmineCore.beforeEach(function () {
        reviewRequest = new RB.ReviewRequest({
          id: 123,
          links: {
            reviews: {
              href: '/api/review-requests/123/reviews/'
            }
          },
          loaded: true
        });
        jasmineCore.spyOn(reviewRequest, 'ready').and.resolveTo();
        collection = new RB.ResourceCollection([], {
          model: RB.Review,
          parentResource: reviewRequest
        });
      });
      jasmineCore.describe('Methods', function () {
        jasmineCore.describe('fetch', function () {
          jasmineCore.it('Populates collection', async function () {
            jasmineCore.spyOn($, 'ajax').and.callFake(request => {
              jasmineCore.expect(request.url).toBe('/api/review-requests/123/reviews/');
              jasmineCore.expect(request.type).toBe('GET');
              request.success({
                links: {
                  next: {
                    href: '/api/review-requests/123/reviews/' + '?start=25',
                    method: 'GET'
                  },
                  self: {
                    href: '/api/review-requests/123/reviews/',
                    method: 'GET'
                  }
                },
                reviews: [{
                  id: 1,
                  links: {}
                }, {
                  id: 2,
                  links: {}
                }],
                stat: 'ok',
                total_results: 2
              });
            });
            await collection.fetch();
            jasmineCore.expect($.ajax).toHaveBeenCalled();
            jasmineCore.expect(collection.length).toBe(2);
            jasmineCore.expect(collection.at(0).id).toBe(1);
            jasmineCore.expect(collection.at(1).id).toBe(2);
            jasmineCore.expect(collection.hasPrev).toBe(false);
            jasmineCore.expect(collection.hasNext).toBe(true);
          });
          jasmineCore.it('With start=', async function () {
            jasmineCore.spyOn($, 'ajax').and.callFake(request => {
              jasmineCore.expect(request.url).toBe('/api/review-requests/123/reviews/');
              jasmineCore.expect(request.data).not.toBe(undefined);
              jasmineCore.expect(request.data.start).toBe(100);
              request.success({});
            });
            await collection.fetch({
              start: 100
            });
            const ajaxOpts = $.ajax.calls.argsFor(0)[0];
            jasmineCore.expect(ajaxOpts.type).toBe('GET');
            jasmineCore.expect(ajaxOpts.url).toBe('/api/review-requests/123/reviews/');
            jasmineCore.expect(ajaxOpts.start).toBe(100);
            jasmineCore.expect(ajaxOpts.data).toEqual({
              api_format: 'json',
              start: 100
            });
          });
          jasmineCore.describe('With parentResource', function () {
            jasmineCore.it('Calls parentResource.ready', async function () {
              jasmineCore.spyOn(RB.BaseCollection.prototype, 'fetch').and.resolveTo();
              await collection.fetch();
              jasmineCore.expect(reviewRequest.ready).toHaveBeenCalled();
              jasmineCore.expect(RB.BaseCollection.prototype.fetch).toHaveBeenCalled();
            });
          });
          jasmineCore.it('Using callbacks', function (done) {
            jasmineCore.spyOn(RB.BaseCollection.prototype, 'fetch').and.resolveTo();
            jasmineCore.spyOn(console, 'warn');
            collection.fetch({
              error: () => done.fail(),
              success: () => {
                jasmineCore.expect(reviewRequest.ready).toHaveBeenCalled();
                jasmineCore.expect(RB.BaseCollection.prototype.fetch).toHaveBeenCalled();
                jasmineCore.expect(console.warn).toHaveBeenCalled();
                done();
              }
            });
          });
        });
        jasmineCore.describe('fetchAll', function () {
          jasmineCore.it('Spanning pages', async function () {
            let numFetches = 0;
            jasmineCore.spyOn($, 'ajax').and.callFake(request => {
              console.assert(numFetches < 2);
              jasmineCore.expect(request.type).toBe('GET');
              numFetches++;
              if (numFetches === 1) {
                jasmineCore.expect(request.url).toBe('/api/review-requests/123/reviews/');
                request.success({
                  links: {
                    next: {
                      href: '/api/review-requests/123/reviews/' + '?start=25',
                      method: 'GET'
                    },
                    self: {
                      href: '/api/review-requests/123/reviews/',
                      method: 'GET'
                    }
                  },
                  reviews: [{
                    id: 1,
                    links: {}
                  }, {
                    id: 2,
                    links: {}
                  }],
                  stat: 'ok',
                  total_results: 4
                });
              } else if (numFetches === 2) {
                jasmineCore.expect(request.url).toBe('/api/review-requests/123/reviews/?start=25');
                request.success({
                  links: {
                    prev: {
                      href: '/api/review-requests/123/reviews/' + '?start=0',
                      method: 'GET'
                    },
                    self: {
                      href: '/api/review-requests/123/reviews/' + '?start=25',
                      method: 'GET'
                    }
                  },
                  reviews: [{
                    id: 3,
                    links: {}
                  }, {
                    id: 4,
                    links: {}
                  }],
                  stat: 'ok',
                  total_results: 4
                });
              }
            });
            await collection.fetchAll();
            jasmineCore.expect($.ajax).toHaveBeenCalled();
            jasmineCore.expect(numFetches).toBe(2);
            jasmineCore.expect(collection.hasPrev).toBe(false);
            jasmineCore.expect(collection.hasNext).toBe(false);
            jasmineCore.expect(collection.totalResults).toBe(4);
            jasmineCore.expect(collection.currentPage).toBe(0);
            jasmineCore.expect(collection.length).toBe(4);
            jasmineCore.expect(collection.at(0).id).toBe(1);
            jasmineCore.expect(collection.at(1).id).toBe(2);
            jasmineCore.expect(collection.at(2).id).toBe(3);
            jasmineCore.expect(collection.at(3).id).toBe(4);
          });
          jasmineCore.it('With callbacks', function (done) {
            let numFetches = 0;
            jasmineCore.spyOn($, 'ajax').and.callFake(request => {
              console.assert(numFetches < 2);
              jasmineCore.expect(request.type).toBe('GET');
              numFetches++;
              if (numFetches === 1) {
                jasmineCore.expect(request.url).toBe('/api/review-requests/123/reviews/');
                request.success({
                  links: {
                    next: {
                      href: '/api/review-requests/123/reviews/' + '?start=25',
                      method: 'GET'
                    },
                    self: {
                      href: '/api/review-requests/123/reviews/',
                      method: 'GET'
                    }
                  },
                  reviews: [{
                    id: 1,
                    links: {}
                  }, {
                    id: 2,
                    links: {}
                  }],
                  stat: 'ok',
                  total_results: 4
                });
              } else if (numFetches === 2) {
                jasmineCore.expect(request.url).toBe('/api/review-requests/123/reviews/?start=25');
                request.success({
                  links: {
                    prev: {
                      href: '/api/review-requests/123/reviews/' + '?start=0',
                      method: 'GET'
                    },
                    self: {
                      href: '/api/review-requests/123/reviews/' + '?start=25',
                      method: 'GET'
                    }
                  },
                  reviews: [{
                    id: 3,
                    links: {}
                  }, {
                    id: 4,
                    links: {}
                  }],
                  stat: 'ok',
                  total_results: 4
                });
              }
            });
            jasmineCore.spyOn(console, 'warn');
            collection.fetchAll({
              error: () => done.fail(),
              success: () => {
                jasmineCore.expect($.ajax).toHaveBeenCalled();
                jasmineCore.expect(numFetches).toBe(2);
                jasmineCore.expect(collection.hasPrev).toBe(false);
                jasmineCore.expect(collection.hasNext).toBe(false);
                jasmineCore.expect(collection.totalResults).toBe(4);
                jasmineCore.expect(collection.currentPage).toBe(0);
                jasmineCore.expect(collection.length).toBe(4);
                jasmineCore.expect(collection.at(0).id).toBe(1);
                jasmineCore.expect(collection.at(1).id).toBe(2);
                jasmineCore.expect(collection.at(2).id).toBe(3);
                jasmineCore.expect(collection.at(3).id).toBe(4);
                jasmineCore.expect(console.warn).toHaveBeenCalled();
                done();
              }
            });
          });
        });
        jasmineCore.describe('fetchNext', function () {
          jasmineCore.it('With hasNext == false', async function () {
            collection.hasNext = false;
            jasmineCore.spyOn(collection, 'fetch');
            await collection.fetchNext();
            jasmineCore.expect(collection.fetch).not.toHaveBeenCalled();
          });
          jasmineCore.it('With hasNext == true', async function () {
            jasmineCore.spyOn($, 'ajax').and.callFake(request => {
              jasmineCore.expect(request.url).toBe('/api/review-requests/123/reviews/?start=25');
              jasmineCore.expect(request.type).toBe('GET');
              request.success({
                links: {
                  next: {
                    href: '/api/review-requests/123/reviews/' + '?start=50',
                    method: 'GET'
                  },
                  prev: {
                    href: '/api/review-requests/123/reviews/' + '?start=0',
                    method: 'GET'
                  },
                  self: {
                    href: '/api/review-requests/123/reviews/',
                    method: 'GET'
                  }
                },
                reviews: [{
                  id: 1,
                  links: {}
                }, {
                  id: 2,
                  links: {}
                }],
                stat: 'ok',
                total_results: 2
              });
            });
            collection.hasNext = true;
            collection.currentPage = 2;
            collection._links = {
              next: {
                href: '/api/review-requests/123/reviews/?start=25',
                method: 'GET'
              }
            };
            jasmineCore.spyOn(collection, 'fetch').and.callThrough();
            await collection.fetchNext();
            jasmineCore.expect(collection.fetch).toHaveBeenCalled();
            jasmineCore.expect(collection.hasPrev).toBe(true);
            jasmineCore.expect(collection.hasNext).toBe(true);
            jasmineCore.expect(collection.currentPage).toBe(3);
            jasmineCore.expect(collection.models.length).toBe(2);
          });
          jasmineCore.it('With callbacks', function (done) {
            jasmineCore.spyOn($, 'ajax').and.callFake(request => {
              jasmineCore.expect(request.url).toBe('/api/review-requests/123/reviews/?start=25');
              jasmineCore.expect(request.type).toBe('GET');
              request.success({
                links: {
                  next: {
                    href: '/api/review-requests/123/reviews/' + '?start=50',
                    method: 'GET'
                  },
                  prev: {
                    href: '/api/review-requests/123/reviews/' + '?start=0',
                    method: 'GET'
                  },
                  self: {
                    href: '/api/review-requests/123/reviews/',
                    method: 'GET'
                  }
                },
                reviews: [{
                  id: 1,
                  links: {}
                }, {
                  id: 2,
                  links: {}
                }],
                stat: 'ok',
                total_results: 2
              });
            });
            collection.hasNext = true;
            collection.currentPage = 2;
            collection._links = {
              next: {
                href: '/api/review-requests/123/reviews/?start=25',
                method: 'GET'
              }
            };
            jasmineCore.spyOn(collection, 'fetch').and.callThrough();
            jasmineCore.spyOn(console, 'warn');
            collection.fetchNext({
              error: () => done.fail(),
              success: () => {
                jasmineCore.expect(collection.fetch).toHaveBeenCalled();
                jasmineCore.expect(collection.hasPrev).toBe(true);
                jasmineCore.expect(collection.hasNext).toBe(true);
                jasmineCore.expect(collection.currentPage).toBe(3);
                jasmineCore.expect(collection.models.length).toBe(2);
                jasmineCore.expect(console.warn).toHaveBeenCalled();
                done();
              }
            });
          });
        });
        jasmineCore.describe('fetchPrev', function () {
          jasmineCore.it('With hasPrev == false', async function () {
            collection.hasPrev = false;
            jasmineCore.spyOn(collection, 'fetch');
            await collection.fetchPrev();
            jasmineCore.expect(collection.fetch).not.toHaveBeenCalled();
          });
          jasmineCore.it('With hasPrev == true', async function () {
            jasmineCore.spyOn($, 'ajax').and.callFake(request => {
              jasmineCore.expect(request.url).toBe('/api/review-requests/123/reviews/?start=25');
              jasmineCore.expect(request.type).toBe('GET');
              request.success({
                links: {
                  next: {
                    href: '/api/review-requests/123/reviews/' + '?start=25',
                    method: 'GET'
                  },
                  prev: {
                    href: '/api/review-requests/123/reviews/' + '?start=0',
                    method: 'GET'
                  },
                  self: {
                    href: '/api/review-requests/123/reviews/',
                    method: 'GET'
                  }
                },
                reviews: [{
                  id: 1,
                  links: {}
                }, {
                  id: 2,
                  links: {}
                }],
                stat: 'ok',
                total_results: 2
              });
            });
            collection.hasPrev = true;
            collection.currentPage = 2;
            collection._links = {
              prev: {
                href: '/api/review-requests/123/reviews/?start=25',
                method: 'GET'
              }
            };
            jasmineCore.spyOn(collection, 'fetch').and.callThrough();
            await collection.fetchPrev();
            jasmineCore.expect(collection.fetch).toHaveBeenCalled();
            jasmineCore.expect(collection.hasPrev).toBe(true);
            jasmineCore.expect(collection.hasNext).toBe(true);
            jasmineCore.expect(collection.currentPage).toBe(1);
            jasmineCore.expect(collection.models.length).toBe(2);
          });
          jasmineCore.it('With callbacks', function (done) {
            jasmineCore.spyOn($, 'ajax').and.callFake(request => {
              jasmineCore.expect(request.url).toBe('/api/review-requests/123/reviews/?start=25');
              jasmineCore.expect(request.type).toBe('GET');
              request.success({
                links: {
                  next: {
                    href: '/api/review-requests/123/reviews/' + '?start=25',
                    method: 'GET'
                  },
                  prev: {
                    href: '/api/review-requests/123/reviews/' + '?start=0',
                    method: 'GET'
                  },
                  self: {
                    href: '/api/review-requests/123/reviews/',
                    method: 'GET'
                  }
                },
                reviews: [{
                  id: 1,
                  links: {}
                }, {
                  id: 2,
                  links: {}
                }],
                stat: 'ok',
                total_results: 2
              });
            });
            collection.hasPrev = true;
            collection.currentPage = 2;
            collection._links = {
              prev: {
                href: '/api/review-requests/123/reviews/?start=25',
                method: 'GET'
              }
            };
            jasmineCore.spyOn(collection, 'fetch').and.callThrough();
            jasmineCore.spyOn(console, 'warn');
            collection.fetchPrev({
              error: () => done.fail(),
              success: () => {
                jasmineCore.expect(collection.fetch).toHaveBeenCalled();
                jasmineCore.expect(collection.hasPrev).toBe(true);
                jasmineCore.expect(collection.hasNext).toBe(true);
                jasmineCore.expect(collection.currentPage).toBe(1);
                jasmineCore.expect(collection.models.length).toBe(2);
                jasmineCore.expect(console.warn).toHaveBeenCalled();
                done();
              }
            });
          });
        });
        jasmineCore.describe('parse', function () {
          let payload;
          jasmineCore.beforeEach(function () {
            payload = {
              links: {},
              reviews: [],
              total_results: 5
            };
          });
          jasmineCore.it('Resources returned', function () {
            payload.reviews = [{
              id: 1
            }, {
              id: 2
            }, {
              id: 3
            }];
            const results = collection.parse(payload);
            jasmineCore.expect(results.length).toBe(3);
            jasmineCore.expect(results[0].id).toBe(1);
            jasmineCore.expect(results[1].id).toBe(2);
            jasmineCore.expect(results[2].id).toBe(3);
          });
          jasmineCore.it('totalResults set', function () {
            collection.parse(payload);
            jasmineCore.expect(collection.totalResults).toBe(5);
          });
          jasmineCore.describe('With fetchingAll', function () {
            const options = {
              fetchingAll: true
            };
            jasmineCore.it('currentPage = 0', function () {
              collection.parse(payload, options);
              jasmineCore.expect(collection.currentPage).toBe(0);
            });
            jasmineCore.it('hasPrev disabled', function () {
              collection.parse(payload, options);
              jasmineCore.expect(collection.hasPrev).toBe(false);
            });
            jasmineCore.it('hasNext disabled', function () {
              collection.parse(payload, options);
              jasmineCore.expect(collection.hasNext).toBe(false);
            });
          });
          jasmineCore.describe('Without fetchingAll', function () {
            jasmineCore.describe('currentPage', function () {
              jasmineCore.it('undefined when not options.page', function () {
                collection.parse(payload);
                jasmineCore.expect(collection.currentPage).toBe(undefined);
              });
              jasmineCore.it('Set when options.page', function () {
                collection.parse(payload, {
                  page: 4
                });
                jasmineCore.expect(collection.currentPage).toBe(4);
              });
            });
            jasmineCore.describe('hasPrev', function () {
              jasmineCore.it('true with rsp.links.prev', function () {
                payload.links = {
                  prev: {
                    href: 'blah'
                  }
                };
                collection.parse(payload);
                jasmineCore.expect(collection.hasPrev).toBe(true);
              });
              jasmineCore.it('false without rsp.links.prev', function () {
                collection.parse(payload);
                jasmineCore.expect(collection.hasPrev).toBe(false);
              });
            });
            jasmineCore.describe('hasNext', function () {
              jasmineCore.it('true with rsp.links.next', function () {
                payload.links = {
                  next: {
                    href: 'blah'
                  }
                };
                collection.parse(payload);
                jasmineCore.expect(collection.hasNext).toBe(true);
              });
              jasmineCore.it('false without rsp.links.next', function () {
                collection.parse(payload);
                jasmineCore.expect(collection.hasNext).toBe(false);
              });
            });
          });
        });
        jasmineCore.describe('url', function () {
          jasmineCore.it('With parentResource', function () {
            jasmineCore.expect(collection.url()).toBe('/api/review-requests/123/reviews/');
          });
          jasmineCore.it('With _fetchURL', function () {
            collection._fetchURL = '/api/foo/';
            jasmineCore.expect(collection.url()).toBe('/api/foo/');
          });
          jasmineCore.it('Without _fetchURL or parentResource', function () {
            collection.parentResource = null;
            jasmineCore.expect(collection.url()).toBe(null);
          });
        });
      });
    });

    jasmineSuites.suite('rb/resources/models/BaseComment', function () {
      const strings = RB.BaseComment.strings;
      let parentObject;
      let model;
      jasmineCore.beforeEach(function () {
        parentObject = new RB.BaseResource({
          'public': true
        });
        model = new RB.BaseComment({
          parentObject: parentObject
        });
        jasmineCore.expect(model.validate(model.attributes)).toBe(undefined);
      });
      jasmineCore.describe('State values', function () {
        jasmineCore.it('STATE_DROPPED', function () {
          jasmineCore.expect(RB.BaseComment.STATE_DROPPED).toBe('dropped');
          jasmineCore.expect(RB.BaseComment.STATE_DROPPED).toBe(RB.CommentIssueStatusType.DROPPED);
        });
        jasmineCore.it('STATE_OPEN', function () {
          jasmineCore.expect(RB.BaseComment.STATE_OPEN).toBe('open');
          jasmineCore.expect(RB.BaseComment.STATE_OPEN).toBe(RB.CommentIssueStatusType.OPEN);
        });
        jasmineCore.it('STATE_RESOLVED', function () {
          jasmineCore.expect(RB.BaseComment.STATE_RESOLVED).toBe('resolved');
          jasmineCore.expect(RB.BaseComment.STATE_RESOLVED).toBe(RB.CommentIssueStatusType.RESOLVED);
        });
        jasmineCore.it('STATE_VERIFYING_DROPPED', function () {
          jasmineCore.expect(RB.BaseComment.STATE_VERIFYING_DROPPED).toBe('verifying-dropped');
          jasmineCore.expect(RB.BaseComment.STATE_VERIFYING_DROPPED).toBe(RB.CommentIssueStatusType.VERIFYING_DROPPED);
        });
        jasmineCore.it('STATE_VERIFYING_RESOLVED', function () {
          jasmineCore.expect(RB.BaseComment.STATE_VERIFYING_RESOLVED).toBe('verifying-resolved');
          jasmineCore.expect(RB.BaseComment.STATE_VERIFYING_RESOLVED).toBe(RB.CommentIssueStatusType.VERIFYING_RESOLVED);
        });
      });
      jasmineCore.describe('destroyIfEmpty', function () {
        jasmineCore.beforeEach(function () {
          jasmineCore.spyOn(model, 'destroy');
        });
        jasmineCore.it('Destroying when text is empty', function () {
          model.set('text', '');
          model.destroyIfEmpty();
          jasmineCore.expect(model.destroy).toHaveBeenCalled();
        });
        jasmineCore.it('Not destroying when text is not empty', function () {
          model.set('text', 'foo');
          model.destroyIfEmpty();
          jasmineCore.expect(model.destroy).not.toHaveBeenCalled();
        });
      });
      jasmineCore.describe('parse', function () {
        jasmineCore.beforeEach(function () {
          model.rspNamespace = 'my_comment';
        });
        jasmineCore.it('API payloads', function () {
          const data = model.parse({
            my_comment: {
              id: 42,
              issue_opened: true,
              issue_status: 'resolved',
              text: 'foo'
            },
            stat: 'ok'
          });
          jasmineCore.expect(data).not.toBe(undefined);
          jasmineCore.expect(data.id).toBe(42);
          jasmineCore.expect(data.issueOpened).toBe(true);
          jasmineCore.expect(data.issueStatus).toBe(RB.CommentIssueStatusType.RESOLVED);
          jasmineCore.expect(data.text).toBe('foo');
        });
      });
      jasmineCore.describe('toJSON', function () {
        jasmineCore.describe('force_text_type field', function () {
          jasmineCore.it('With value', function () {
            model.set('forceTextType', 'html');
            const data = model.toJSON();
            jasmineCore.expect(data.force_text_type).toBe('html');
          });
          jasmineCore.it('Without value', function () {
            const data = model.toJSON();
            jasmineCore.expect(data.force_text_type).toBe(undefined);
          });
        });
        jasmineCore.describe('include_text_types field', function () {
          jasmineCore.it('With value', function () {
            model.set('includeTextTypes', 'html');
            const data = model.toJSON();
            jasmineCore.expect(data.include_text_types).toBe('html');
          });
          jasmineCore.it('Without value', function () {
            const data = model.toJSON();
            jasmineCore.expect(data.include_text_types).toBe(undefined);
          });
        });
        jasmineCore.describe('issue_opened field', function () {
          jasmineCore.it('Default', function () {
            const data = model.toJSON();
            jasmineCore.expect(data.issue_opened).toBe(null);
          });
          jasmineCore.it('With value', function () {
            model.set('issueOpened', false);
            let data = model.toJSON();
            jasmineCore.expect(data.issue_opened).toBe(false);
            model.set('issueOpened', true);
            data = model.toJSON();
            jasmineCore.expect(data.issue_opened).toBe(true);
          });
        });
        jasmineCore.describe('issue_status field', function () {
          jasmineCore.it('When not loaded', function () {
            model.set('issueStatus', RB.CommentIssueStatusType.DROPPED);
            const data = model.toJSON();
            jasmineCore.expect(data.issue_status).toBe(undefined);
          });
          jasmineCore.it('When loaded and parent is not public', function () {
            parentObject.set('public', false);
            model.set({
              issueStatus: RB.CommentIssueStatusType.DROPPED,
              loaded: true,
              parentObject: parentObject
            });
            const data = model.toJSON();
            jasmineCore.expect(data.issue_status).toBe(undefined);
          });
          jasmineCore.it('When loaded and parent is public', function () {
            parentObject.set('public', true);
            model.set({
              issueStatus: RB.CommentIssueStatusType.DROPPED,
              loaded: true,
              parentObject: parentObject
            });
            const data = model.toJSON();
            jasmineCore.expect(data.issue_status).toBe(RB.CommentIssueStatusType.DROPPED);
          });
        });
        jasmineCore.describe('richText field', function () {
          jasmineCore.it('With true', function () {
            model.set('richText', true);
            const data = model.toJSON();
            jasmineCore.expect(data.text_type).toBe('markdown');
          });
          jasmineCore.it('With false', function () {
            model.set('richText', false);
            const data = model.toJSON();
            jasmineCore.expect(data.text_type).toBe('plain');
          });
        });
        jasmineCore.describe('text field', function () {
          jasmineCore.it('With value', function () {
            model.set('text', 'foo');
            const data = model.toJSON();
            jasmineCore.expect(data.text).toBe('foo');
          });
        });
      });
      jasmineCore.describe('validate', function () {
        jasmineCore.describe('issueState', function () {
          jasmineCore.it('DROPPED', function () {
            jasmineCore.expect(model.validate({
              issueStatus: RB.CommentIssueStatusType.DROPPED
            })).toBe(undefined);
          });
          jasmineCore.it('OPEN', function () {
            jasmineCore.expect(model.validate({
              issueStatus: RB.CommentIssueStatusType.OPEN
            })).toBe(undefined);
          });
          jasmineCore.it('RESOLVED', function () {
            jasmineCore.expect(model.validate({
              issueStatus: RB.CommentIssueStatusType.RESOLVED
            })).toBe(undefined);
          });
          jasmineCore.it('VERIFYING_DROPPED', function () {
            jasmineCore.expect(model.validate({
              issueStatus: RB.CommentIssueStatusType.VERIFYING_DROPPED
            })).toBe(undefined);
          });
          jasmineCore.it('VERIFYING_RESOLVED', function () {
            jasmineCore.expect(model.validate({
              issueStatus: RB.CommentIssueStatusType.VERIFYING_RESOLVED
            })).toBe(undefined);
          });
          jasmineCore.it('Unset', function () {
            jasmineCore.expect(model.validate({
              issueStatus: ''
            })).toBe(undefined);
            jasmineCore.expect(model.validate({
              issueStatus: undefined
            })).toBe(undefined);
            jasmineCore.expect(model.validate({
              issueStatus: null
            })).toBe(undefined);
          });
          jasmineCore.it('Invalid values', function () {
            jasmineCore.expect(model.validate({
              issueStatus: 'foobar'
            })).toBe(strings.INVALID_ISSUE_STATUS);
          });
        });
        jasmineCore.describe('parentObject', function () {
          jasmineCore.it('With value', function () {
            jasmineCore.expect(model.validate({
              parentObject: parentObject
            })).toBe(undefined);
          });
          jasmineCore.it('Unset', function () {
            jasmineCore.expect(model.validate({
              parentObject: null
            })).toBe(RB.BaseResource.strings.UNSET_PARENT_OBJECT);
          });
        });
      });
    });

    jasmineSuites.suite('rb/resources/models/BaseResource', function () {
      let model;
      let parentObject;
      jasmineCore.beforeEach(function () {
        model = new RB.BaseResource();
        model.rspNamespace = 'foo';
        parentObject = new RB.BaseResource({
          links: {
            foos: {
              href: '/api/foos/'
            }
          }
        });
      });
      jasmineCore.describe('ensureCreated', function () {
        jasmineCore.beforeEach(function () {
          jasmineCore.spyOn(model, 'save').and.resolveTo();
          jasmineCore.spyOn(model, 'fetch').and.resolveTo();
          jasmineCore.spyOn(model, 'ready').and.callThrough();
        });
        jasmineCore.it('With loaded=true', async function () {
          model.set('loaded', true);
          await model.ensureCreated();
          jasmineCore.expect(model.ready).toHaveBeenCalled();
          jasmineCore.expect(model.fetch).not.toHaveBeenCalled();
          jasmineCore.expect(model.save).not.toHaveBeenCalled();
        });
        jasmineCore.it('With loaded=false, isNew=true', async function () {
          model.set('loaded', false);
          await model.ensureCreated();
          jasmineCore.expect(model.ready).toHaveBeenCalled();
          jasmineCore.expect(model.fetch).not.toHaveBeenCalled();
          jasmineCore.expect(model.save).toHaveBeenCalled();
        });
        jasmineCore.it('With loaded=false, isNew=false', async function () {
          model.set({
            id: 1,
            loaded: false
          });
          await model.ensureCreated();
          jasmineCore.expect(model.ready).toHaveBeenCalled();
          jasmineCore.expect(model.fetch).toHaveBeenCalled();
          jasmineCore.expect(model.save).toHaveBeenCalled();
        });
        jasmineCore.it('With callbacks', function (done) {
          model.set({
            id: 1,
            loaded: false
          });
          jasmineCore.spyOn(console, 'warn');
          model.ensureCreated({
            error: () => done.fail(),
            success: () => {
              jasmineCore.expect(model.ready).toHaveBeenCalled();
              jasmineCore.expect(model.fetch).toHaveBeenCalled();
              jasmineCore.expect(model.save).toHaveBeenCalled();
              jasmineCore.expect(console.warn).toHaveBeenCalled();
              done();
            }
          });
        });
      });
      jasmineCore.describe('fetch', function () {
        jasmineCore.describe('Basic functionality', function () {
          jasmineCore.beforeEach(function () {
            jasmineCore.spyOn(Backbone.Model.prototype, 'fetch').and.callFake(options => {
              if (options && _.isFunction(options.success)) {
                options.success();
              }
            });
          });
          jasmineCore.it('With isNew=true', async function () {
            jasmineCore.expect(model.isNew()).toBe(true);
            await jasmineCore.expectAsync(model.fetch()).toBeRejectedWith(Error('fetch cannot be used on a resource without an ID'));
            jasmineCore.expect(Backbone.Model.prototype.fetch).not.toHaveBeenCalled();
          });
          jasmineCore.it('With isNew=false and no parentObject', async function () {
            model.set('id', 123);
            await model.fetch();
            jasmineCore.expect(Backbone.Model.prototype.fetch).toHaveBeenCalled();
          });
          jasmineCore.it('With isNew=false and parentObject', async function () {
            model.set({
              id: 123,
              parentObject: parentObject
            });
            jasmineCore.spyOn(parentObject, 'ready').and.resolveTo();
            await model.fetch();
            jasmineCore.expect(parentObject.ready).toHaveBeenCalled();
            jasmineCore.expect(Backbone.Model.prototype.fetch).toHaveBeenCalled();
          });
          jasmineCore.it('With isNew=false and parentObject with error', async function () {
            model.set({
              id: 123,
              parentObject: parentObject
            });
            jasmineCore.spyOn(parentObject, 'ready').and.rejectWith(new BackboneError(parentObject, {
              errorText: 'Oh nosers.'
            }, {}));
            await jasmineCore.expectAsync(model.fetch()).toBeRejectedWith(Error('Oh nosers.'));
            jasmineCore.expect(parentObject.ready).toHaveBeenCalled();
            jasmineCore.expect(Backbone.Model.prototype.fetch).not.toHaveBeenCalled();
          });
          jasmineCore.it('With callbacks', function (done) {
            model.set({
              id: 123,
              parentObject: parentObject
            });
            jasmineCore.spyOn(parentObject, 'ready').and.resolveTo();
            jasmineCore.spyOn(console, 'warn');
            model.fetch({
              error: () => done.fail(),
              success: () => {
                jasmineCore.expect(parentObject.ready).toHaveBeenCalled();
                jasmineCore.expect(Backbone.Model.prototype.fetch).toHaveBeenCalled();
                jasmineCore.expect(console.warn).toHaveBeenCalled();
                done();
              }
            });
          });
        });
        jasmineCore.describe('Response handling', function () {
          jasmineCore.beforeEach(function () {
            model.set({
              id: 123,
              links: {
                self: {
                  href: '/api/foo/'
                }
              }
            });
          });
          jasmineCore.it('Custom response parsing', async function () {
            jasmineCore.spyOn(model, 'parse').and.callFake(rsp => ({
              a: rsp.a + 1,
              b: rsp.b,
              c: true
            }));
            jasmineCore.spyOn($, 'ajax').and.callFake(request => {
              request.success({
                a: 10,
                b: 20,
                d: 30
              });
            });
            await model.fetch();
            jasmineCore.expect(model.get('a')).toBe(11);
            jasmineCore.expect(model.get('b')).toBe(20);
            jasmineCore.expect(model.get('c')).toBe(true);
            jasmineCore.expect(model.get('d')).toBe(undefined);
          });
          jasmineCore.it('Default response parsing', async function () {
            jasmineCore.spyOn(model, 'parse').and.callThrough();
            jasmineCore.spyOn($, 'ajax').and.callFake(request => {
              request.success({
                foo: {
                  a: 20,
                  id: 42,
                  links: {
                    foo: {
                      href: 'bar'
                    }
                  }
                },
                stat: 'ok'
              });
            });
            await model.fetch();
            jasmineCore.expect(model.get('a')).toBe(undefined);
            jasmineCore.expect(model.id).toBe(42);
            jasmineCore.expect(model.get('links').foo).not.toBe(undefined);
            jasmineCore.expect(model.get('loaded')).toBe(true);
          });
        });
        jasmineCore.describe('Request payload', function () {
          jasmineCore.beforeEach(function () {
            model.set({
              id: 123,
              links: {
                self: {
                  href: '/api/foo/'
                }
              }
            });
          });
          jasmineCore.describe('GET', function () {
            jasmineCore.it('No contentType sent', async function () {
              jasmineCore.spyOn(Backbone, 'sync').and.callFake((method, model, options) => {
                jasmineCore.expect(options.contentType).toBe(undefined);
                options.success.call(model, {});
              });
              await model.fetch();
              jasmineCore.expect(Backbone.sync).toHaveBeenCalled();
            });
            jasmineCore.it('No model data sent', async function () {
              jasmineCore.spyOn(Backbone, 'sync').and.callFake((method, model, options) => {
                jasmineCore.expect(_.isEmpty(options.data)).toBe(true);
                options.success.call(model, {});
              });
              model.toJSON = () => ({
                a: 1,
                b: 2
              });
              await model.fetch();
              jasmineCore.expect(Backbone.sync).toHaveBeenCalled();
            });
            jasmineCore.it('Query attributes sent', async function () {
              jasmineCore.spyOn(Backbone, 'sync').and.callFake((method, model, options) => {
                jasmineCore.expect(_.isEmpty(options.data)).toBe(false);
                jasmineCore.expect(options.data.foo).toBe('bar');
                options.success.call(model, {});
              });
              model.toJSON = () => ({
                a: 1,
                b: 2
              });
              await model.fetch({
                data: {
                  foo: 'bar'
                }
              });
              jasmineCore.expect(Backbone.sync).toHaveBeenCalled();
            });
          });
        });
      });
      jasmineCore.describe('ready', function () {
        jasmineCore.beforeEach(function () {
          jasmineCore.spyOn(model, 'fetch').and.resolveTo();
        });
        jasmineCore.it('With loaded=true', async function () {
          model.set('loaded', true);
          await model.ready();
          jasmineCore.expect(model.fetch).not.toHaveBeenCalled();
        });
        jasmineCore.it('With loaded=false and isNew=true', async function () {
          model.set('loaded', false);
          jasmineCore.expect(model.isNew()).toBe(true);
          await model.ready();
          jasmineCore.expect(model.fetch).not.toHaveBeenCalled();
        });
        jasmineCore.it('With loaded=false and isNew=false', async function () {
          model.set({
            id: 123,
            loaded: false
          });
          jasmineCore.expect(model.isNew()).toBe(false);
          await model.ready();
          jasmineCore.expect(model.fetch).toHaveBeenCalled();
        });
        jasmineCore.it('With callbacks', function (done) {
          model.set({
            id: 123,
            loaded: false
          });
          jasmineCore.expect(model.isNew()).toBe(false);
          jasmineCore.spyOn(console, 'warn');
          model.ready({
            error: () => done.fail(),
            success: () => {
              jasmineCore.expect(model.fetch).toHaveBeenCalled();
              jasmineCore.expect(console.warn).toHaveBeenCalled();
              done();
            }
          });
        });
      });
      jasmineCore.describe('save', function () {
        jasmineCore.beforeEach(function () {
          /* This is needed for any ready() calls. */
          jasmineCore.spyOn(Backbone.Model.prototype, 'fetch').and.callFake(options => {
            if (options && _.isFunction(options.success)) {
              options.success();
            }
          });
          jasmineCore.spyOn(model, 'trigger');
        });
        jasmineCore.it('With isNew=true and parentObject', async function () {
          const responseData = {
            foo: {},
            stat: 'ok'
          };
          jasmineCore.spyOn(parentObject, 'ensureCreated').and.resolveTo();
          jasmineCore.spyOn(parentObject, 'ready').and.resolveTo();
          jasmineCore.spyOn(Backbone.Model.prototype, 'save').and.callThrough();
          model.set('parentObject', parentObject);
          jasmineCore.spyOn(RB, 'apiCall').and.callThrough();
          jasmineCore.spyOn($, 'ajax').and.callFake(request => {
            jasmineCore.expect(request.type).toBe('POST');
            request.success(responseData);
          });
          await model.save();
          jasmineCore.expect(Backbone.Model.prototype.save).toHaveBeenCalled();
          jasmineCore.expect(parentObject.ensureCreated).toHaveBeenCalled();
          jasmineCore.expect(RB.apiCall).toHaveBeenCalled();
          jasmineCore.expect($.ajax).toHaveBeenCalled();
          jasmineCore.expect(model.trigger).toHaveBeenCalledWith('saved', {});
        });
        jasmineCore.it('With isNew=true and no parentObject', async function () {
          jasmineCore.spyOn(Backbone.Model.prototype, 'save').and.callThrough();
          jasmineCore.spyOn(RB, 'apiCall').and.callThrough();
          jasmineCore.spyOn($, 'ajax');
          try {
            await model.save();
            throw new Error();
          } catch (err) {
            jasmineCore.expect(Backbone.Model.prototype.save).not.toHaveBeenCalled();
            jasmineCore.expect(RB.apiCall).not.toHaveBeenCalled();
            jasmineCore.expect($.ajax).not.toHaveBeenCalled();
            jasmineCore.expect(err.message).toBe('The object must either be loaded from the server ' + 'or have a parent object before it can be saved');
            jasmineCore.expect(model.trigger).not.toHaveBeenCalledWith('saved', {});
          }
        });
        jasmineCore.it('With isNew=false and no parentObject', async function () {
          model.set('id', 123);
          model.url = '/api/foos/1/';
          jasmineCore.spyOn(Backbone.Model.prototype, 'save').and.callFake((attrs, options) => {
            if (options && _.isFunction(options.success)) {
              options.success();
            }
          });
          await model.save();
          jasmineCore.expect(Backbone.Model.prototype.save).toHaveBeenCalled();
          jasmineCore.expect(model.trigger).toHaveBeenCalledWith('saved', {});
        });
        jasmineCore.it('With isNew=false and parentObject', async function () {
          jasmineCore.spyOn(parentObject, 'ensureCreated').and.resolveTo();
          jasmineCore.spyOn(Backbone.Model.prototype, 'save').and.callThrough();
          model.set({
            id: 123,
            parentObject: parentObject
          });
          jasmineCore.spyOn(parentObject, 'ready').and.resolveTo();
          jasmineCore.spyOn(RB, 'apiCall').and.callThrough();
          jasmineCore.spyOn($, 'ajax').and.callFake(request => {
            jasmineCore.expect(request.type).toBe('PUT');
            request.success({
              foo: {},
              stat: 'ok'
            });
          });
          await model.save();
          jasmineCore.expect(parentObject.ready).toHaveBeenCalled();
          jasmineCore.expect(Backbone.Model.prototype.save).toHaveBeenCalled();
          jasmineCore.expect(RB.apiCall).toHaveBeenCalled();
          jasmineCore.expect($.ajax).toHaveBeenCalled();
          jasmineCore.expect(model.trigger).toHaveBeenCalledWith('saved', {});
        });
        jasmineCore.it('With isNew=false and parentObject with error', async function () {
          model.set({
            id: 123,
            parentObject: parentObject
          });
          jasmineCore.spyOn(parentObject, 'ready').and.rejectWith(new BackboneError(parentObject, {
            errorText: 'Oh nosers.'
          }, {}));
          jasmineCore.spyOn(Backbone.Model.prototype, 'save').and.callFake((attrs, options) => {
            if (options && _.isFunction(options.success)) {
              options.success();
            }
          });
          await jasmineCore.expectAsync(model.save()).toBeRejectedWith(Error('Oh nosers.'));
          jasmineCore.expect(parentObject.ready).toHaveBeenCalled();
          jasmineCore.expect(Backbone.Model.prototype.save).not.toHaveBeenCalled();
          jasmineCore.expect(model.trigger).not.toHaveBeenCalledWith('saved');
        });
        jasmineCore.it('With callbacks', function (done) {
          const responseData = {
            foo: {},
            stat: 'ok'
          };
          jasmineCore.spyOn(parentObject, 'ensureCreated').and.resolveTo();
          jasmineCore.spyOn(parentObject, 'ready').and.resolveTo();
          jasmineCore.spyOn(Backbone.Model.prototype, 'save').and.callThrough();
          model.set('parentObject', parentObject);
          jasmineCore.spyOn(RB, 'apiCall').and.callThrough();
          jasmineCore.spyOn($, 'ajax').and.callFake(request => {
            jasmineCore.expect(request.type).toBe('POST');
            request.success(responseData);
          });
          jasmineCore.spyOn(console, 'warn');
          model.save({
            error: () => done.fail(),
            success: () => {
              jasmineCore.expect(Backbone.Model.prototype.save).toHaveBeenCalled();
              jasmineCore.expect(parentObject.ensureCreated).toHaveBeenCalled();
              jasmineCore.expect(RB.apiCall).toHaveBeenCalled();
              jasmineCore.expect($.ajax).toHaveBeenCalled();
              jasmineCore.expect(model.trigger).toHaveBeenCalledWith('saved', {});
              jasmineCore.expect(console.warn).toHaveBeenCalled();
              done();
            }
          });
        });
        jasmineCore.describe('Request payload', function () {
          jasmineCore.it('Saved data', async function () {
            model.set('id', 1);
            model.url = '/api/foos/';
            jasmineCore.expect(model.isNew()).toBe(false);
            jasmineCore.spyOn(model, 'toJSON').and.callFake(() => ({
              a: 10,
              b: 20,
              c: 30
            }));
            jasmineCore.spyOn(model, 'ready').and.resolveTo();
            jasmineCore.spyOn(RB, 'apiCall').and.callThrough();
            jasmineCore.spyOn($, 'ajax').and.callFake(request => {
              jasmineCore.expect(request.url).toBe(model.url);
              jasmineCore.expect(request.contentType).toBe('application/x-www-form-urlencoded');
              jasmineCore.expect(request.processData).toBe(true);
              jasmineCore.expect(request.data.a).toBe(10);
              jasmineCore.expect(request.data.b).toBe(20);
              jasmineCore.expect(request.data.c).toBe(30);
              request.success({
                foo: {
                  a: 10,
                  b: 20,
                  c: 30,
                  id: 1,
                  links: {}
                },
                stat: 'ok'
              });
            });
            await model.save();
            jasmineCore.expect(model.toJSON).toHaveBeenCalled();
            jasmineCore.expect(RB.apiCall).toHaveBeenCalled();
            jasmineCore.expect($.ajax).toHaveBeenCalled();
          });
        });
        jasmineCore.describe('With file upload support', function () {
          jasmineCore.beforeEach(function () {
            model.payloadFileKeys = ['file'];
            model.url = '/api/foos/';
            model.toJSON = function () {
              return {
                file: this.get('file'),
                myfield: 'myvalue'
              };
            };
            jasmineCore.spyOn(Backbone.Model.prototype, 'save').and.callThrough();
            jasmineCore.spyOn(RB, 'apiCall').and.callThrough();
          });
          jasmineCore.it('With file', async function () {
            const boundary = '-----multipartformboundary';
            const blob = new File(['Hello world!'], 'myfile', {
              type: 'text/plain'
            });
            jasmineCore.spyOn($, 'ajax').and.callFake(request => {
              const fileReader = new FileReader();
              jasmineCore.expect(request.type).toBe('POST');
              jasmineCore.expect(request.processData).toBe(false);
              jasmineCore.expect(request.contentType.indexOf('multipart/form-data; boundary=')).toBe(0);
              fileReader.onload = function () {
                const array = new Uint8Array(this.result);
                const data = [];
                for (let i = 0; i < array.length; i++) {
                  data.push(String.fromCharCode(array[i]));
                }
                jasmineCore.expect(data.join('')).toBe('--' + boundary + '\r\n' + 'Content-Disposition: form-data; name="file"' + '; filename="myfile"\r\n' + 'Content-Type: text/plain\r\n\r\n' + 'Hello world!' + '\r\n' + '--' + boundary + '\r\n' + 'Content-Disposition: form-data; ' + 'name="myfield"\r\n\r\n' + 'myvalue\r\n' + '--' + boundary + '--\r\n\r\n');
                request.success({
                  foo: {
                    id: 42
                  },
                  stat: 'ok'
                });
              };
              fileReader.readAsArrayBuffer(request.data);
            });
            model.set('file', blob);
            await model.save({
              boundary
            });
            jasmineCore.expect(Backbone.Model.prototype.save).toHaveBeenCalled();
            jasmineCore.expect(RB.apiCall).toHaveBeenCalled();
            jasmineCore.expect($.ajax).toHaveBeenCalled();
          });
          jasmineCore.it('With multiple files', async function () {
            const boundary = '-----multipartformboundary';
            const blob1 = new File(['Hello world!'], 'myfile1', {
              type: 'text/plain'
            });
            const blob2 = new File(['Goodbye world!'], 'myfile2', {
              type: 'text/plain'
            });
            model.payloadFileKeys = ['file1', 'file2'];
            model.toJSON = function () {
              return {
                file1: this.get('file1'),
                file2: this.get('file2'),
                myfield: 'myvalue'
              };
            };
            jasmineCore.spyOn($, 'ajax').and.callFake(request => {
              const fileReader = new FileReader();
              jasmineCore.expect(request.type).toBe('POST');
              jasmineCore.expect(request.processData).toBe(false);
              jasmineCore.expect(request.contentType.indexOf('multipart/form-data; boundary=')).toBe(0);
              fileReader.onload = function () {
                const array = new Uint8Array(this.result);
                const data = [];
                for (let i = 0; i < array.length; i++) {
                  data.push(String.fromCharCode(array[i]));
                }
                jasmineCore.expect(data.join('')).toBe('--' + boundary + '\r\n' + 'Content-Disposition: form-data; name="file1"' + '; filename="myfile1"\r\n' + 'Content-Type: text/plain\r\n\r\n' + 'Hello world!' + '\r\n' + '--' + boundary + '\r\n' + 'Content-Disposition: form-data; name="file2"' + '; filename="myfile2"\r\n' + 'Content-Type: text/plain\r\n\r\n' + 'Goodbye world!' + '\r\n' + '--' + boundary + '\r\n' + 'Content-Disposition: form-data; ' + 'name="myfield"\r\n\r\n' + 'myvalue\r\n' + '--' + boundary + '--\r\n\r\n');
                request.success({
                  foo: {
                    id: 42
                  },
                  stat: 'ok'
                });
              };
              fileReader.readAsArrayBuffer(request.data);
            });
            model.set('file1', blob1);
            model.set('file2', blob2);
            await model.save({
              boundary
            });
            jasmineCore.expect(Backbone.Model.prototype.save).toHaveBeenCalled();
            jasmineCore.expect(RB.apiCall).toHaveBeenCalled();
            jasmineCore.expect($.ajax).toHaveBeenCalled();
          });
          jasmineCore.it('Without file', async function () {
            jasmineCore.spyOn($, 'ajax').and.callFake(request => {
              jasmineCore.expect(request.type).toBe('POST');
              jasmineCore.expect(request.processData).toBe(true);
              jasmineCore.expect(request.contentType).toBe('application/x-www-form-urlencoded');
              request.success({
                foo: {
                  id: 42
                },
                stat: 'ok'
              });
            });
            await model.save();
            jasmineCore.expect(Backbone.Model.prototype.save).toHaveBeenCalled();
            jasmineCore.expect(RB.apiCall).toHaveBeenCalled();
            jasmineCore.expect($.ajax).toHaveBeenCalled();
          });
        });
        jasmineCore.describe('With form upload support', function () {
          jasmineCore.beforeEach(function () {
            model.url = '/api/foos/';
          });
          jasmineCore.it('Overriding toJSON attributes', async function () {
            const form = $('<form>').append($('<input name="foo">'));
            model.toJSON = () => ({
              myfield: 'myvalue'
            });
            jasmineCore.spyOn(Backbone, 'sync').and.callThrough();
            jasmineCore.spyOn(RB, 'apiCall').and.callThrough();
            jasmineCore.spyOn($, 'ajax');
            jasmineCore.spyOn(form, 'ajaxSubmit').and.callFake(request => request.success({}));
            await model.save({
              form: form
            });
            jasmineCore.expect(RB.apiCall).toHaveBeenCalled();
            jasmineCore.expect(form.ajaxSubmit).toHaveBeenCalled();
            jasmineCore.expect($.ajax).not.toHaveBeenCalled();
            jasmineCore.expect(Backbone.sync.calls.argsFor(0)[2].data).toBe(null);
            jasmineCore.expect(RB.apiCall.calls.argsFor(0)[0].data).toBe(null);
          });
          jasmineCore.it('Overriding file attributes', async function () {
            const form = $('<form>').append($('<input name="foo">'));
            model.payloadFileKey = 'file';
            model.toJSON = function () {
              return {
                file: this.get('file')
              };
            };
            jasmineCore.spyOn(model, '_saveWithFiles').and.callThrough();
            jasmineCore.spyOn(Backbone, 'sync').and.callThrough();
            jasmineCore.spyOn(RB, 'apiCall').and.callThrough();
            jasmineCore.spyOn($, 'ajax');
            jasmineCore.spyOn(form, 'ajaxSubmit').and.callFake(request => request.success({}));
            await model.save({
              form: form
            });
            jasmineCore.expect(model._saveWithFiles).not.toHaveBeenCalled();
            jasmineCore.expect(RB.apiCall).toHaveBeenCalled();
            jasmineCore.expect(form.ajaxSubmit).toHaveBeenCalled();
            jasmineCore.expect($.ajax).not.toHaveBeenCalled();
            jasmineCore.expect(Backbone.sync.calls.argsFor(0)[2].data).toBe(null);
            jasmineCore.expect(RB.apiCall.calls.argsFor(0)[0].data).toBe(null);
          });
        });
      });
      jasmineCore.describe('url', function () {
        jasmineCore.it('With self link', function () {
          const url = '/api/base-resource/';
          model.set('links', {
            self: {
              href: url
            }
          });
          jasmineCore.expect(model.url()).toBe(url);
        });
        jasmineCore.it('With parentObject and model ID', function () {
          model.set({
            id: 123,
            parentObject: parentObject
          });
          jasmineCore.expect(model.url()).toBe('/api/foos/123/');
        });
        jasmineCore.it('With parentObject, no links', function () {
          model.set('parentObject', parentObject);
          jasmineCore.expect(model.url()).toBe('/api/foos/');
        });
        jasmineCore.it('With no parentObject, no links', function () {
          jasmineCore.expect(model.url()).toBe(null);
        });
      });
    });

    jasmineSuites.suite('rb/resources/models/DefaultReviewer', function () {
      let model;
      jasmineCore.beforeEach(function () {
        model = new RB.DefaultReviewer();
      });
      jasmineCore.describe('parse', function () {
        jasmineCore.it('API payloads', function () {
          const data = model.parse({
            default_reviewer: {
              file_regex: '/foo/.*',
              id: 42,
              name: 'my-default-reviewer'
            },
            stat: 'ok'
          });
          jasmineCore.expect(data).not.toBe(undefined);
          jasmineCore.expect(data.id).toBe(42);
          jasmineCore.expect(data.name).toBe('my-default-reviewer');
          jasmineCore.expect(data.fileRegex).toBe('/foo/.*');
        });
      });
      jasmineCore.describe('toJSON', function () {
        jasmineCore.describe('name field', function () {
          jasmineCore.it('With value', function () {
            model.set('name', 'foo');
            const data = model.toJSON();
            jasmineCore.expect(data.name).toBe('foo');
          });
        });
        jasmineCore.describe('fileRegex field', function () {
          jasmineCore.it('With value', function () {
            model.set('fileRegex', '/foo/.*');
            const data = model.toJSON();
            jasmineCore.expect(data.file_regex).toBe('/foo/.*');
          });
        });
      });
    });

    jasmineSuites.suite('rb/resources/models/DraftReview', function () {
      let model;
      let parentObject;
      jasmineCore.beforeEach(function () {
        parentObject = new RB.BaseResource({
          links: {
            reviews: {
              href: '/api/foos/'
            }
          }
        });
        model = new RB.DraftReview({
          parentObject: parentObject
        });
        model.rspNamespace = 'foo';
      });
      jasmineCore.describe('Methods', function () {
        jasmineCore.describe('ready', function () {
          jasmineCore.beforeEach(function () {
            jasmineCore.spyOn(Backbone.Model.prototype, 'fetch').and.callFake(options => {
              if (options && _.isFunction(options.success)) {
                options.success();
              }
            });
            jasmineCore.spyOn(parentObject, 'ready').and.resolveTo();
            jasmineCore.spyOn(model, '_retrieveDraft').and.resolveTo();
          });
          jasmineCore.it('With isNew=true', async function () {
            jasmineCore.expect(model.isNew()).toBe(true);
            jasmineCore.expect(model.get('loaded')).toBe(false);
            await model.ready();
            jasmineCore.expect(parentObject.ready).toHaveBeenCalled();
            jasmineCore.expect(model._retrieveDraft).toHaveBeenCalled();
          });
          jasmineCore.it('With isNew=false', async function () {
            model.set({
              id: 123
            });
            await model.ready();
            jasmineCore.expect(parentObject.ready).toHaveBeenCalled();
            jasmineCore.expect(model._retrieveDraft).not.toHaveBeenCalled();
          });
          jasmineCore.it('With callbacks', function (done) {
            jasmineCore.expect(model.isNew()).toBe(true);
            jasmineCore.expect(model.get('loaded')).toBe(false);
            jasmineCore.spyOn(console, 'warn');
            model.ready({
              error: () => done.fail(),
              success: () => {
                jasmineCore.expect(parentObject.ready).toHaveBeenCalled();
                jasmineCore.expect(model._retrieveDraft).toHaveBeenCalled();
                jasmineCore.expect(console.warn).toHaveBeenCalled();
                done();
              }
            });
          });
        });
        jasmineCore.describe('publish', function () {
          jasmineCore.beforeEach(function () {
            jasmineCore.spyOn(model, 'save').and.resolveTo();
            jasmineCore.spyOn(model, 'ready').and.resolveTo();
          });
          jasmineCore.it('Triggers "publishing" event before publish', async function () {
            jasmineCore.spyOn(model, 'trigger');
            await model.publish();
            jasmineCore.expect(model.trigger).toHaveBeenCalledWith('publishing');
          });
          jasmineCore.it('Triggers "published" event after publish', async function () {
            jasmineCore.spyOn(model, 'trigger');
            await model.publish();
            jasmineCore.expect(model.trigger).toHaveBeenCalledWith('published');
          });
          jasmineCore.it('Sets "public" to true', async function () {
            jasmineCore.expect(model.get('public')).toBe(false);
            await model.publish();
            jasmineCore.expect(model.get('public')).toBe(true);
          });
        });
      });
    });

    jasmineSuites.suite('rb/resources/models/FileAttachment', function () {
      let model;
      let parentObject;
      jasmineCore.beforeEach(function () {
        parentObject = new RB.BaseResource({
          public: true
        });
        model = new RB.FileAttachment({
          parentObject: parentObject
        });
      });
      jasmineCore.describe('toJSON', function () {
        jasmineCore.describe('caption field', function () {
          jasmineCore.it('With value', function () {
            model.set('caption', 'foo');
            const data = model.toJSON();
            jasmineCore.expect(data.caption).toBe('foo');
          });
        });
        jasmineCore.describe('file field', function () {
          jasmineCore.it('With new file attachment', function () {
            jasmineCore.expect(model.isNew()).toBe(true);
            model.set('file', 'abc');
            const data = model.toJSON();
            jasmineCore.expect(data.path).toBe('abc');
          });
          jasmineCore.it('With existing file attachment', function () {
            model.id = 123;
            model.attributes.id = 123;
            jasmineCore.expect(model.isNew()).toBe(false);
            model.set('file', 'abc');
            const data = model.toJSON();
            jasmineCore.expect(data.path).toBe(undefined);
          });
        });
      });
      jasmineCore.describe('parse', function () {
        jasmineCore.it('API payloads', function () {
          const data = model.parse({
            stat: 'ok',
            file_attachment: {
              attachment_history_id: 1,
              caption: 'caption',
              filename: 'filename',
              id: 42,
              review_url: 'reviewURL',
              revision: 123,
              state: 'Published',
              thumbnail: 'thumbnailHTML',
              url: 'downloadURL'
            }
          });
          jasmineCore.expect(data).not.toBe(undefined);
          jasmineCore.expect(data.attachmentHistoryID).toBe(1);
          jasmineCore.expect(data.caption).toBe('caption');
          jasmineCore.expect(data.downloadURL).toBe('downloadURL');
          jasmineCore.expect(data.filename).toBe('filename');
          jasmineCore.expect(data.id).toBe(42);
          jasmineCore.expect(data.reviewURL).toBe('reviewURL');
          jasmineCore.expect(data.revision).toBe(123);
          jasmineCore.expect(data.state).toBe('Published');
          jasmineCore.expect(data.thumbnailHTML).toBe('thumbnailHTML');
        });
      });
    });

    jasmineSuites.suite('rb/resources/models/ReviewGroup', function () {
      jasmineCore.describe('setStarred', function () {
        const url = '/api/users/testuser/watched/groups/';
        let group;
        let session;
        jasmineCore.beforeEach(function () {
          RB.UserSession.instance = null;
          session = RB.UserSession.create({
            username: 'testuser',
            watchedReviewGroupsURL: url
          });
          group = new RB.ReviewGroup({
            id: 1
          });
          jasmineCore.spyOn(session.watchedGroups, 'addImmediately').and.callThrough();
          jasmineCore.spyOn(session.watchedGroups, 'removeImmediately').and.callThrough();
          jasmineCore.spyOn(RB, 'apiCall').and.callThrough();
        });
        jasmineCore.it('true', async function () {
          jasmineCore.spyOn($, 'ajax').and.callFake(request => {
            jasmineCore.expect(request.type).toBe('POST');
            jasmineCore.expect(request.url).toBe(url);
            request.success({
              stat: 'ok'
            });
          });
          await group.setStarred(true);
          jasmineCore.expect(session.watchedGroups.addImmediately).toHaveBeenCalled();
          jasmineCore.expect(RB.apiCall).toHaveBeenCalled();
          jasmineCore.expect($.ajax).toHaveBeenCalled();
        });
        jasmineCore.it('false', async function () {
          jasmineCore.spyOn($, 'ajax').and.callFake(request => {
            jasmineCore.expect(request.type).toBe('DELETE');
            jasmineCore.expect(request.url).toBe(url + '1/');
            request.success({
              stat: 'ok'
            });
          });
          await group.setStarred(false);
          jasmineCore.expect(session.watchedGroups.removeImmediately).toHaveBeenCalled();
          jasmineCore.expect(RB.apiCall).toHaveBeenCalled();
          jasmineCore.expect($.ajax).toHaveBeenCalled();
        });
        jasmineCore.it('With callbacks', function (done) {
          jasmineCore.spyOn($, 'ajax').and.callFake(request => {
            jasmineCore.expect(request.type).toBe('POST');
            jasmineCore.expect(request.url).toBe(url);
            request.success({
              stat: 'ok'
            });
          });
          jasmineCore.spyOn(console, 'warn');
          group.setStarred(true, {
            error: () => done.fail(),
            success: () => {
              jasmineCore.expect(session.watchedGroups.addImmediately).toHaveBeenCalled();
              jasmineCore.expect(RB.apiCall).toHaveBeenCalled();
              jasmineCore.expect($.ajax).toHaveBeenCalled();
              jasmineCore.expect(console.warn).toHaveBeenCalled();
              done();
            }
          });
        });
      });
      jasmineCore.describe('addUser', function () {
        let group;
        jasmineCore.beforeEach(function () {
          group = new RB.ReviewGroup({
            id: 1,
            name: 'test-group'
          });
          jasmineCore.spyOn(RB, 'apiCall').and.callThrough();
        });
        jasmineCore.it('Loaded group', async function () {
          jasmineCore.spyOn($, 'ajax').and.callFake(request => {
            jasmineCore.expect(request.type).toBe('POST');
            jasmineCore.expect(request.data.username).toBe('my-user');
            request.success({
              stat: 'ok'
            });
          });
          await group.addUser('my-user');
          jasmineCore.expect(RB.apiCall).toHaveBeenCalled();
          jasmineCore.expect($.ajax).toHaveBeenCalled();
        });
        jasmineCore.it('With callbacks', function (done) {
          jasmineCore.spyOn($, 'ajax').and.callFake(request => {
            jasmineCore.expect(request.type).toBe('POST');
            jasmineCore.expect(request.data.username).toBe('my-user');
            request.success({
              stat: 'ok'
            });
          });
          jasmineCore.spyOn(console, 'warn');
          group.addUser('my-user', {
            error: () => done.fail(),
            success: () => {
              jasmineCore.expect(RB.apiCall).toHaveBeenCalled();
              jasmineCore.expect($.ajax).toHaveBeenCalled();
              jasmineCore.expect(console.warn).toHaveBeenCalled();
              done();
            }
          });
        });
        jasmineCore.it('Unloaded group', async function () {
          jasmineCore.spyOn($, 'ajax');
          group.set('id', null);
          jasmineCore.expect(group.isNew()).toBe(true);
          await expectAsync(group.addUser('my-user')).toBeRejectedWith(Error('Unable to add to the group.'));
          jasmineCore.expect(RB.apiCall).not.toHaveBeenCalled();
          jasmineCore.expect($.ajax).not.toHaveBeenCalled();
        });
      });
      jasmineCore.describe('removeUser', function () {
        let group;
        jasmineCore.beforeEach(function () {
          group = new RB.ReviewGroup({
            id: 1,
            name: 'test-group'
          });
          jasmineCore.spyOn(RB, 'apiCall').and.callThrough();
        });
        jasmineCore.it('Loaded group', async function () {
          jasmineCore.spyOn($, 'ajax').and.callFake(request => {
            jasmineCore.expect(request.type).toBe('DELETE');
            request.success();
          });
          await group.removeUser('my-user');
          jasmineCore.expect(RB.apiCall).toHaveBeenCalled();
          jasmineCore.expect($.ajax).toHaveBeenCalled();
        });
        jasmineCore.it('With callbacks', function (done) {
          jasmineCore.spyOn($, 'ajax').and.callFake(request => {
            jasmineCore.expect(request.type).toBe('DELETE');
            request.success();
          });
          jasmineCore.spyOn(console, 'warn');
          group.removeUser('my-user', {
            error: () => done.fail(),
            success: () => {
              jasmineCore.expect(RB.apiCall).toHaveBeenCalled();
              jasmineCore.expect($.ajax).toHaveBeenCalled();
              jasmineCore.expect(console.warn).toHaveBeenCalled();
              done();
            }
          });
        });
        jasmineCore.it('Unloaded group', async function () {
          jasmineCore.spyOn($, 'ajax');
          group.set('id', null);
          jasmineCore.expect(group.isNew()).toBe(true);
          await expectAsync(group.removeUser('my-user')).toBeRejectedWith(Error('Unable to remove from the group.'));
          jasmineCore.expect(RB.apiCall).not.toHaveBeenCalled();
          jasmineCore.expect($.ajax).not.toHaveBeenCalled();
        });
      });
    });

    jasmineSuites.suite('rb/resources/models/Review', function () {
      let model;
      jasmineCore.beforeEach(function () {
        model = new RB.Review({
          parentObject: new RB.ReviewRequest()
        });
      });
      jasmineCore.describe('createReply', function () {
        jasmineCore.it('Returns cached draft reply', function () {
          jasmineCore.expect(model.get('draftReply')).toBe(null);
          const reviewReply = model.createReply();
          jasmineCore.expect(model.get('draftReply')).toBe(reviewReply);
          const reviewReply2 = model.createReply();
          jasmineCore.expect(reviewReply).toBe(reviewReply2);
        });
        jasmineCore.it('Cached draft reply resets on publish', function () {
          const reviewReply = model.createReply();
          jasmineCore.expect(model.get('draftReply')).toBe(reviewReply);
          reviewReply.trigger('published');
          jasmineCore.expect(model.get('draftReply')).toBe(null);
        });
      });
      jasmineCore.describe('parse', function () {
        jasmineCore.beforeEach(function () {
          model.rspNamespace = 'my_review';
        });
        jasmineCore.it('Common API payloads', function () {
          const data = model.parse({
            my_review: {
              body_bottom: 'my body bottom',
              body_bottom_text_type: 'plain',
              body_top: 'my body top',
              body_top_text_type: 'markdown',
              id: 42,
              'public': false,
              ship_it: false
            },
            stat: 'ok'
          });
          jasmineCore.expect(data).not.toBe(undefined);
          jasmineCore.expect(data.id).toBe(42);
          jasmineCore.expect(data.bodyTop).toBe('my body top');
          jasmineCore.expect(data.bodyBottom).toBe('my body bottom');
          jasmineCore.expect(data.public).toBe(false);
          jasmineCore.expect(data.bodyTopRichText).toBe(true);
          jasmineCore.expect(data.bodyBottomRichText).toBe(false);
          jasmineCore.expect(data.shipIt).toBe(false);
        });
        jasmineCore.it('With raw_text_fields', function () {
          const data = model.parse({
            my_review: {
              body_bottom: 'my body bottom',
              body_bottom_text_type: 'plain',
              body_top: 'my body top',
              body_top_text_type: 'markdown',
              raw_text_fields: {
                body_bottom: 'raw body bottom',
                body_bottom_text_type: 'raw',
                body_top: 'raw body top',
                body_top_text_type: 'raw'
              }
            },
            stat: 'ok'
          });
          jasmineCore.expect(data).not.toBe(undefined);
          jasmineCore.expect(data.bodyTop).toBe('my body top');
          jasmineCore.expect(data.bodyBottom).toBe('my body bottom');
          jasmineCore.expect(data.bodyTopRichText).toBe(false);
          jasmineCore.expect(data.bodyBottomRichText).toBe(false);
          jasmineCore.expect(data.rawTextFields).toBeTruthy();
          jasmineCore.expect(data.rawTextFields.bodyTop).toBe('raw body top');
          jasmineCore.expect(data.rawTextFields.bodyBottom).toBe('raw body bottom');
        });
        jasmineCore.it('With markdown_text_fields', function () {
          const data = model.parse({
            my_review: {
              body_bottom: 'my body bottom',
              body_bottom_text_type: 'plain',
              body_top: 'my body top',
              body_top_text_type: 'markdown',
              markdown_text_fields: {
                body_bottom: 'Markdown body bottom',
                body_bottom_text_type: 'markdown',
                body_top: 'Markdown body top',
                body_top_text_type: 'markdown'
              }
            },
            stat: 'ok'
          });
          jasmineCore.expect(data).not.toBe(undefined);
          jasmineCore.expect(data.bodyTop).toBe('my body top');
          jasmineCore.expect(data.bodyBottom).toBe('my body bottom');
          jasmineCore.expect(data.bodyTopRichText).toBe(true);
          jasmineCore.expect(data.bodyBottomRichText).toBe(false);
          jasmineCore.expect(data.markdownTextFields).toBeTruthy();
          jasmineCore.expect(data.markdownTextFields.bodyTop).toBe('Markdown body top');
          jasmineCore.expect(data.markdownTextFields.bodyBottom).toBe('Markdown body bottom');
        });
        jasmineCore.it('With html_text_fields', function () {
          const data = model.parse({
            my_review: {
              body_bottom: 'my body bottom',
              body_bottom_text_type: 'plain',
              body_top: 'my body top',
              body_top_text_type: 'markdown',
              html_text_fields: {
                body_bottom: 'HTML body bottom',
                body_bottom_text_type: 'html',
                body_top: 'HTML body top',
                body_top_text_type: 'html'
              }
            },
            stat: 'ok'
          });
          jasmineCore.expect(data).not.toBe(undefined);
          jasmineCore.expect(data.bodyTop).toBe('my body top');
          jasmineCore.expect(data.bodyBottom).toBe('my body bottom');
          jasmineCore.expect(data.bodyTopRichText).toBe(true);
          jasmineCore.expect(data.bodyBottomRichText).toBe(false);
          jasmineCore.expect(data.htmlTextFields).toBeTruthy();
          jasmineCore.expect(data.htmlTextFields.bodyTop).toBe('HTML body top');
          jasmineCore.expect(data.htmlTextFields.bodyBottom).toBe('HTML body bottom');
        });
      });
      jasmineCore.describe('toJSON', function () {
        jasmineCore.describe('bodyTop field', function () {
          jasmineCore.it('With value', function () {
            model.set('bodyTop', 'foo');
            const data = model.toJSON();
            jasmineCore.expect(data.body_top).toBe('foo');
          });
        });
        jasmineCore.describe('bodyBottom field', function () {
          jasmineCore.it('With value', function () {
            model.set('bodyBottom', 'foo');
            const data = model.toJSON();
            jasmineCore.expect(data.body_bottom).toBe('foo');
          });
        });
        jasmineCore.describe('force_text_type field', function () {
          jasmineCore.it('With value', function () {
            model.set('forceTextType', 'html');
            const data = model.toJSON();
            jasmineCore.expect(data.force_text_type).toBe('html');
          });
          jasmineCore.it('Without value', function () {
            const data = model.toJSON();
            jasmineCore.expect(data.force_text_type).toBe(undefined);
          });
        });
        jasmineCore.describe('include_text_types field', function () {
          jasmineCore.it('With value', function () {
            model.set('includeTextTypes', 'html');
            const data = model.toJSON();
            jasmineCore.expect(data.include_text_types).toBe('html');
          });
          jasmineCore.it('Without value', function () {
            const data = model.toJSON();
            jasmineCore.expect(data.include_text_types).toBe(undefined);
          });
        });
        jasmineCore.describe('public field', function () {
          jasmineCore.it('With value', function () {
            model.set('public', true);
            const data = model.toJSON();
            jasmineCore.expect(data.public).toBe(1);
          });
          jasmineCore.it('Without value', function () {
            const data = model.toJSON();
            jasmineCore.expect(data.public).toBe(undefined);
          });
        });
        jasmineCore.describe('bodyTopRichText field', function () {
          jasmineCore.it('With true', function () {
            model.set('bodyTopRichText', true);
            const data = model.toJSON();
            jasmineCore.expect(data.body_top_text_type).toBe('markdown');
          });
          jasmineCore.it('With false', function () {
            model.set('bodyTopRichText', false);
            const data = model.toJSON();
            jasmineCore.expect(data.body_top_text_type).toBe('plain');
          });
        });
        jasmineCore.describe('bodyBottomRichText field', function () {
          jasmineCore.it('With true', function () {
            model.set('bodyBottomRichText', true);
            const data = model.toJSON();
            jasmineCore.expect(data.body_bottom_text_type).toBe('markdown');
          });
          jasmineCore.it('With false', function () {
            model.set('bodyBottomRichText', false);
            const data = model.toJSON();
            jasmineCore.expect(data.body_bottom_text_type).toBe('plain');
          });
        });
        jasmineCore.describe('shipIt field', function () {
          jasmineCore.it('With value', function () {
            model.set('shipIt', true);
            const data = model.toJSON();
            jasmineCore.expect(data.ship_it).toBe(true);
          });
        });
      });
    });

    jasmineSuites.suite('rb/resources/models/ReviewReply', function () {
      let parentObject;
      let model;
      jasmineCore.beforeEach(function () {
        parentObject = new RB.BaseResource({
          links: {
            replies: {
              href: '/api/foos/replies/'
            }
          },
          'public': true
        });
        model = new RB.ReviewReply({
          parentObject: parentObject
        });
      });
      jasmineCore.describe('destroy', function () {
        jasmineCore.beforeEach(function () {
          jasmineCore.spyOn(Backbone.Model.prototype, 'destroy').and.callFake(options => options.success());
          jasmineCore.spyOn(model, '_retrieveDraft').and.callThrough();
          jasmineCore.spyOn(parentObject, 'ready').and.resolveTo();
        });
        jasmineCore.it('With isNew=true', async function () {
          jasmineCore.expect(model.isNew()).toBe(true);
          jasmineCore.expect(model.get('loaded')).toBe(false);
          jasmineCore.spyOn(Backbone.Model.prototype, 'fetch').and.callFake(options => {
            if (options && _.isFunction(options.success)) {
              options.error(model, {
                status: 404
              });
            }
          });
          await model.destroy();
          jasmineCore.expect(model.isNew()).toBe(true);
          jasmineCore.expect(model.get('loaded')).toBe(false);
          jasmineCore.expect(parentObject.ready).toHaveBeenCalled();
          jasmineCore.expect(model._retrieveDraft).toHaveBeenCalled();
          jasmineCore.expect(Backbone.Model.prototype.fetch).toHaveBeenCalled();
          jasmineCore.expect(Backbone.Model.prototype.destroy).toHaveBeenCalled();
        });
        jasmineCore.it('With isNew=false', async function () {
          model.set({
            id: 123,
            loaded: true
          });
          jasmineCore.spyOn(Backbone.Model.prototype, 'fetch');
          await model.destroy();
          jasmineCore.expect(parentObject.ready).toHaveBeenCalled();
          jasmineCore.expect(model._retrieveDraft).not.toHaveBeenCalled();
          jasmineCore.expect(Backbone.Model.prototype.fetch).not.toHaveBeenCalled();
          jasmineCore.expect(Backbone.Model.prototype.destroy).toHaveBeenCalled();
        });
      });
      jasmineCore.describe('discardIfEmpty', function () {
        jasmineCore.beforeEach(function () {
          jasmineCore.spyOn(model, 'destroy').and.resolveTo();
          jasmineCore.spyOn(parentObject, 'ready').and.resolveTo();
          jasmineCore.spyOn(model, 'ready').and.resolveTo();
        });
        jasmineCore.it('With isNew=true', async function () {
          jasmineCore.expect(model.isNew()).toBe(true);
          jasmineCore.expect(model.get('loaded')).toBe(false);
          const discarded = await model.discardIfEmpty();
          jasmineCore.expect(model.destroy).not.toHaveBeenCalled();
          jasmineCore.expect(discarded).toBe(false);
        });
        jasmineCore.describe('With isNew=false', function () {
          let commentsData;
          jasmineCore.beforeEach(function () {
            commentsData = {};
            model.set({
              id: 123,
              links: {
                diff_comments: {
                  href: '/api/diff-comments/'
                },
                file_attachment_comments: {
                  href: '/api/file-attachment-comments/'
                },
                general_comments: {
                  href: '/api/general-comments/'
                },
                screenshot_comments: {
                  href: '/api/screenshot-comments/'
                },
                self: {
                  href: '/api/foos/replies/123/'
                }
              },
              loaded: true
            });
            jasmineCore.spyOn(RB, 'apiCall').and.callFake(options => {
              const links = model.get('links');
              const data = {};
              const key = _.find(RB.ReviewReply.COMMENT_LINK_NAMES, name => options.url === links[name].href);
              if (key) {
                data[key] = commentsData[key] || [];
                options.success(data);
              } else {
                options.error({
                  status: 404
                });
              }
            });
            jasmineCore.spyOn(Backbone.Model.prototype, 'fetch').and.callFake(options => {
              if (options && _.isFunction(options.success)) {
                options.success();
              }
            });
          });
          jasmineCore.it('With no comments or body replies', async function () {
            const discarded = await model.discardIfEmpty();
            jasmineCore.expect(discarded).toBe(true);
            jasmineCore.expect(model.destroy).toHaveBeenCalled();
          });
          jasmineCore.it('With bodyTop', async function () {
            model.set({
              bodyTop: 'hi'
            });
            const discarded = await model.discardIfEmpty();
            jasmineCore.expect(discarded).toBe(false);
            jasmineCore.expect(model.destroy).not.toHaveBeenCalled();
          });
          jasmineCore.it('With bodyBottom', async function () {
            model.set({
              bodyBottom: 'hi'
            });
            const discarded = await model.discardIfEmpty();
            jasmineCore.expect(discarded).toBe(false);
            jasmineCore.expect(model.destroy).not.toHaveBeenCalled();
          });
          jasmineCore.it('With diff comment', async function () {
            commentsData.diff_comments = [{
              id: 1
            }];
            const discarded = await model.discardIfEmpty();
            jasmineCore.expect(discarded).toBe(false);
            jasmineCore.expect(model.destroy).not.toHaveBeenCalled();
          });
          jasmineCore.it('With screenshot comment', async function () {
            commentsData.screenshot_comments = [{
              id: 1
            }];
            const discarded = await model.discardIfEmpty();
            jasmineCore.expect(discarded).toBe(false);
            jasmineCore.expect(model.destroy).not.toHaveBeenCalled();
          });
          jasmineCore.it('With file attachment comment', async function () {
            commentsData.file_attachment_comments = [{
              id: 1
            }];
            const discarded = await model.discardIfEmpty();
            jasmineCore.expect(discarded).toBe(false);
            jasmineCore.expect(model.destroy).not.toHaveBeenCalled();
          });
          jasmineCore.it('With general comment', async function () {
            commentsData.general_comments = [{
              id: 1
            }];
            const discarded = await model.discardIfEmpty();
            jasmineCore.expect(discarded).toBe(false);
            jasmineCore.expect(model.destroy).not.toHaveBeenCalled();
          });
          jasmineCore.it('With callbacks', function (done) {
            jasmineCore.spyOn(console, 'warn');
            model.discardIfEmpty({
              error: () => done.fail(),
              success: discarded => {
                jasmineCore.expect(discarded).toBe(true);
                jasmineCore.expect(model.destroy).toHaveBeenCalled();
                jasmineCore.expect(console.warn).toHaveBeenCalled();
                done();
              }
            });
          });
        });
      });
      jasmineCore.describe('ready', function () {
        jasmineCore.beforeEach(function () {
          jasmineCore.spyOn(parentObject, 'ready').and.resolveTo();
        });
        jasmineCore.it('With isNew=true', async function () {
          jasmineCore.expect(model.isNew()).toBe(true);
          jasmineCore.expect(model.get('loaded')).toBe(false);
          jasmineCore.spyOn(Backbone.Model.prototype, 'fetch').and.resolveTo();
          jasmineCore.spyOn(model, '_retrieveDraft').and.resolveTo();
          await model.ready();
          jasmineCore.expect(parentObject.ready).toHaveBeenCalled();
          jasmineCore.expect(model._retrieveDraft).toHaveBeenCalled();
        });
        jasmineCore.it('With isNew=false', async function () {
          model.set({
            id: 123
          });
          jasmineCore.spyOn(Backbone.Model.prototype, 'fetch').and.callFake(options => {
            if (options && _.isFunction(options.success)) {
              options.success();
            }
          });
          jasmineCore.spyOn(model, '_retrieveDraft').and.resolveTo();
          await model.ready();
          jasmineCore.expect(parentObject.ready).toHaveBeenCalled();
          jasmineCore.expect(model._retrieveDraft).not.toHaveBeenCalled();
        });
        jasmineCore.it('After destruction', async function () {
          jasmineCore.spyOn(model, '_retrieveDraft').and.callThrough();
          jasmineCore.spyOn(Backbone.Model.prototype, 'fetch').and.callFake(options => {
            model.set({
              id: 123,
              links: {
                self: {
                  href: '/api/foos/replies/123/'
                }
              },
              loaded: true
            });
            options.success();
          });
          jasmineCore.spyOn(Backbone.Model.prototype, 'destroy').and.callFake(options => options.success());
          jasmineCore.expect(model.isNew()).toBe(true);
          jasmineCore.expect(model.get('loaded')).toBe(false);
          jasmineCore.expect(model._needDraft).toBe(undefined);

          /* Make our initial ready call. */
          await model.ready();
          jasmineCore.expect(parentObject.ready).toHaveBeenCalled();
          jasmineCore.expect(model._retrieveDraft).toHaveBeenCalled();
          jasmineCore.expect(Backbone.Model.prototype.fetch).toHaveBeenCalled();
          jasmineCore.expect(model.isNew()).toBe(false);
          jasmineCore.expect(model.get('loaded')).toBe(true);
          jasmineCore.expect(model._needDraft).toBe(false);

          /* We have a loaded object. Reset it. */
          await model.destroy();
          jasmineCore.expect(model.isNew()).toBe(true);
          jasmineCore.expect(model.get('loaded')).toBe(false);
          jasmineCore.expect(model._needDraft).toBe(true);
          parentObject.ready.calls.reset();
          model._retrieveDraft.calls.reset();

          /* Now that it's destroyed, try to fetch it again. */
          await model.ready();
          jasmineCore.expect(model._retrieveDraft).toHaveBeenCalled();
          jasmineCore.expect(Backbone.Model.prototype.fetch).toHaveBeenCalled();
          jasmineCore.expect(model._needDraft).toBe(false);
        });
        jasmineCore.it('With callbacks', function (done) {
          jasmineCore.expect(model.isNew()).toBe(true);
          jasmineCore.expect(model.get('loaded')).toBe(false);
          jasmineCore.spyOn(Backbone.Model.prototype, 'fetch').and.callFake(options => {
            if (options && _.isFunction(options.success)) {
              options.success();
            }
          });
          jasmineCore.spyOn(model, '_retrieveDraft').and.resolveTo();
          jasmineCore.spyOn(console, 'warn');
          model.ready({
            error: () => done.fail(),
            success: () => {
              jasmineCore.expect(parentObject.ready).toHaveBeenCalled();
              jasmineCore.expect(model._retrieveDraft).toHaveBeenCalled();
              jasmineCore.expect(console.warn).toHaveBeenCalled();
              done();
            }
          });
        });
      });
      jasmineCore.describe('parse', function () {
        jasmineCore.beforeEach(function () {
          model.rspNamespace = 'my_reply';
        });
        jasmineCore.it('API payloads', function () {
          const data = model.parse({
            my_reply: {
              body_bottom: 'bar',
              body_bottom_text_type: 'plain',
              body_top: 'foo',
              body_top_text_type: 'markdown',
              id: 42,
              'public': false
            },
            stat: 'ok'
          });
          jasmineCore.expect(data).not.toBe(undefined);
          jasmineCore.expect(data.id).toBe(42);
          jasmineCore.expect(data.bodyTop).toBe('foo');
          jasmineCore.expect(data.bodyBottom).toBe('bar');
          jasmineCore.expect(data.public).toBe(false);
          jasmineCore.expect(data.bodyTopRichText).toBe(true);
          jasmineCore.expect(data.bodyBottomRichText).toBe(false);
        });
      });
      jasmineCore.describe('toJSON', function () {
        jasmineCore.describe('bodyTop field', function () {
          jasmineCore.it('With value', function () {
            model.set('bodyTop', 'foo');
            const data = model.toJSON();
            jasmineCore.expect(data.body_top).toBe('foo');
          });
        });
        jasmineCore.describe('bodyBottom field', function () {
          jasmineCore.it('With value', function () {
            model.set('bodyBottom', 'foo');
            const data = model.toJSON();
            jasmineCore.expect(data.body_bottom).toBe('foo');
          });
        });
        jasmineCore.describe('bodyTopRichText field', function () {
          jasmineCore.it('With true', function () {
            model.set('bodyTopRichText', true);
            const data = model.toJSON();
            jasmineCore.expect(data.body_top_text_type).toBe('markdown');
          });
          jasmineCore.it('With false', function () {
            model.set('bodyTopRichText', false);
            const data = model.toJSON();
            jasmineCore.expect(data.body_top_text_type).toBe('plain');
          });
        });
        jasmineCore.describe('bodyBottomRichText field', function () {
          jasmineCore.it('With true', function () {
            model.set('bodyBottomRichText', true);
            const data = model.toJSON();
            jasmineCore.expect(data.body_bottom_text_type).toBe('markdown');
          });
          jasmineCore.it('With false', function () {
            model.set('bodyBottomRichText', false);
            const data = model.toJSON();
            jasmineCore.expect(data.body_bottom_text_type).toBe('plain');
          });
        });
        jasmineCore.describe('force_text_type field', function () {
          jasmineCore.it('With value', function () {
            model.set('forceTextType', 'html');
            const data = model.toJSON();
            jasmineCore.expect(data.force_text_type).toBe('html');
          });
          jasmineCore.it('Without value', function () {
            const data = model.toJSON();
            jasmineCore.expect(data.force_text_type).toBe(undefined);
          });
        });
        jasmineCore.describe('include_text_types field', function () {
          jasmineCore.it('With value', function () {
            model.set('includeTextTypes', 'html');
            const data = model.toJSON();
            jasmineCore.expect(data.include_text_types).toBe('html');
          });
          jasmineCore.it('Without value', function () {
            const data = model.toJSON();
            jasmineCore.expect(data.include_text_types).toBe(undefined);
          });
        });
        jasmineCore.describe('public field', function () {
          jasmineCore.it('With value', function () {
            model.set('public', true);
            const data = model.toJSON();
            jasmineCore.expect(data.public).toBe(true);
          });
        });
      });
    });

    jasmineSuites.suite('rb/resources/models/ReviewRequest', function () {
      let reviewRequest;
      jasmineCore.describe('Create from commit ID', function () {
        jasmineCore.beforeEach(function () {
          reviewRequest = new RB.ReviewRequest();
          jasmineCore.spyOn($, 'ajax').and.callFake(request => {
            jasmineCore.expect(request.data.commit_id).toBe('test');
            jasmineCore.expect(request.data.create_from_commit_id).toBe(true);
            request.success({});
          });
        });
        jasmineCore.it('With promises', async function () {
          await reviewRequest.createFromCommit('test');
        });
      });
      jasmineCore.describe('Existing instance', function () {
        jasmineCore.beforeEach(function () {
          reviewRequest = new RB.ReviewRequest({
            id: 1
          });
          jasmineCore.spyOn(reviewRequest, 'ready').and.resolveTo();
        });
        jasmineCore.it('createDiff', function () {
          const diff = reviewRequest.createDiff();
          jasmineCore.expect(diff.get('parentObject')).toBe(reviewRequest);
        });
        jasmineCore.it('createScreenshot', function () {
          const screenshot = reviewRequest.createScreenshot(42);
          jasmineCore.expect(screenshot.get('parentObject')).toBe(reviewRequest);
          jasmineCore.expect(screenshot.id).toBe(42);
        });
        jasmineCore.it('createFileAttachment', function () {
          const fileAttachment = reviewRequest.createFileAttachment({
            id: 42
          });
          jasmineCore.expect(fileAttachment.get('parentObject')).toBe(reviewRequest);
          jasmineCore.expect(fileAttachment.id).toBe(42);
        });
        jasmineCore.it('parse', function () {
          const data = reviewRequest.parse({
            review_request: {
              branch: 'branch',
              bugs_closed: 'bugsClosed',
              close_description: 'closeDescription',
              close_description_text_type: 'markdown',
              description: 'description',
              description_text_type: 'markdown',
              id: 1,
              last_updated: 'lastUpdated',
              'public': 'public',
              summary: 'summary',
              target_groups: 'targetGroups',
              target_people: 'targetPeople',
              testing_done: 'testingDone',
              testing_done_text_type: 'plain'
            },
            stat: 'ok'
          });
          jasmineCore.expect(data).not.toBe(undefined);
          jasmineCore.expect(data.id).toBe(1);
          jasmineCore.expect(data.branch).toBe('branch');
          jasmineCore.expect(data.bugsClosed).toBe('bugsClosed');
          jasmineCore.expect(data.closeDescription).toBe('closeDescription');
          jasmineCore.expect(data.closeDescriptionRichText).toBe(true);
          jasmineCore.expect(data.description).toBe('description');
          jasmineCore.expect(data.descriptionRichText).toBe(true);
          jasmineCore.expect(data.lastUpdated).toBe('lastUpdated');
          jasmineCore.expect(data.public).toBe('public');
          jasmineCore.expect(data.summary).toBe('summary');
          jasmineCore.expect(data.targetGroups).toBe('targetGroups');
          jasmineCore.expect(data.targetPeople).toBe('targetPeople');
          jasmineCore.expect(data.testingDone).toBe('testingDone');
          jasmineCore.expect(data.testingDoneRichText).toBe(false);
        });
        jasmineCore.describe('reopen', function () {
          jasmineCore.it('With promises', async function () {
            jasmineCore.spyOn(RB, 'apiCall').and.callThrough();
            jasmineCore.spyOn($, 'ajax').and.callFake(request => {
              jasmineCore.expect(request.type).toBe('PUT');
              jasmineCore.expect(request.data.status).toBe('pending');
              request.success({
                review_request: {
                  id: 1,
                  links: {}
                },
                stat: 'ok'
              });
            });
            await reviewRequest.reopen();
            jasmineCore.expect(RB.apiCall).toHaveBeenCalled();
            jasmineCore.expect($.ajax).toHaveBeenCalled();
          });
        });
        jasmineCore.describe('createReview', function () {
          jasmineCore.it('With review ID', function () {
            const review = reviewRequest.createReview(42);
            jasmineCore.expect(review.get('parentObject')).toBe(reviewRequest);
            jasmineCore.expect(review.get('id')).toBe(42);
            jasmineCore.expect(reviewRequest.get('draftReview')).toBe(null);
            jasmineCore.expect(reviewRequest.reviews.length).toBe(1);
            jasmineCore.expect(reviewRequest.reviews.get(42)).toBe(review);
          });
          jasmineCore.it('Without review ID', function () {
            const review1 = reviewRequest.createReview();
            const review2 = reviewRequest.createReview();
            jasmineCore.expect(review1.get('parentObject')).toBe(reviewRequest);
            jasmineCore.expect(review1.id).toBeFalsy();
            jasmineCore.expect(reviewRequest.get('draftReview')).toBe(review1);
            jasmineCore.expect(review1).toBe(review2);
            jasmineCore.expect(reviewRequest.reviews.length).toBe(0);
          });
        });
        jasmineCore.describe('setStarred', function () {
          const url = '/api/users/testuser/watched/review-requests/';
          let session;
          jasmineCore.beforeEach(function () {
            RB.UserSession.instance = null;
            session = RB.UserSession.create({
              username: 'testuser',
              watchedReviewRequestsURL: url
            });
            jasmineCore.spyOn(session.watchedReviewRequests, 'addImmediately').and.callThrough();
            jasmineCore.spyOn(session.watchedReviewRequests, 'removeImmediately').and.callThrough();
            jasmineCore.spyOn(RB, 'apiCall').and.callThrough();
          });
          jasmineCore.it('true', async function () {
            jasmineCore.spyOn($, 'ajax').and.callFake(request => {
              jasmineCore.expect(request.type).toBe('POST');
              jasmineCore.expect(request.url).toBe(url);
              request.success({
                stat: 'ok'
              });
            });
            await reviewRequest.setStarred(true);
            jasmineCore.expect(session.watchedReviewRequests.addImmediately).toHaveBeenCalled();
            jasmineCore.expect(RB.apiCall).toHaveBeenCalled();
            jasmineCore.expect($.ajax).toHaveBeenCalled();
          });
          jasmineCore.it('false', async function () {
            jasmineCore.spyOn($, 'ajax').and.callFake(request => {
              jasmineCore.expect(request.type).toBe('DELETE');
              jasmineCore.expect(request.url).toBe(url + '1/');
              request.success({
                stat: 'ok'
              });
            });
            await reviewRequest.setStarred(false);
            jasmineCore.expect(session.watchedReviewRequests.removeImmediately).toHaveBeenCalled();
            jasmineCore.expect(RB.apiCall).toHaveBeenCalled();
            jasmineCore.expect($.ajax).toHaveBeenCalled();
          });
        });
        jasmineCore.describe('close', function () {
          jasmineCore.it('With type=CLOSE_DISCARDED', async function () {
            jasmineCore.spyOn(RB, 'apiCall').and.callThrough();
            jasmineCore.spyOn($, 'ajax').and.callFake(request => {
              jasmineCore.expect(request.type).toBe('PUT');
              jasmineCore.expect(request.data.status).toBe('discarded');
              jasmineCore.expect(request.data.description).toBe(undefined);
              request.success({
                review_request: {
                  id: 1,
                  links: {}
                },
                stat: 'ok'
              });
            });
            await reviewRequest.close({
              type: RB.ReviewRequest.CLOSE_DISCARDED
            });
            jasmineCore.expect(RB.apiCall).toHaveBeenCalled();
            jasmineCore.expect($.ajax).toHaveBeenCalled();
          });
          jasmineCore.it('With type=CLOSE_SUBMITTED', async function () {
            jasmineCore.spyOn(RB, 'apiCall').and.callThrough();
            jasmineCore.spyOn($, 'ajax').and.callFake(request => {
              jasmineCore.expect(request.type).toBe('PUT');
              jasmineCore.expect(request.data.status).toBe('submitted');
              jasmineCore.expect(request.data.description).toBe(undefined);
              request.success({
                review_request: {
                  id: 1,
                  links: {}
                },
                stat: 'ok'
              });
            });
            await reviewRequest.close({
              type: RB.ReviewRequest.CLOSE_SUBMITTED
            });
            jasmineCore.expect(RB.apiCall).toHaveBeenCalled();
            jasmineCore.expect($.ajax).toHaveBeenCalled();
          });
          jasmineCore.it('With invalid type', async function () {
            jasmineCore.spyOn(RB, 'apiCall').and.callThrough();
            jasmineCore.spyOn($, 'ajax');
            await jasmineCore.expectAsync(reviewRequest.close({
              type: 'foo'
            })).toBeRejectedWith(Error('Invalid close type'));
            jasmineCore.expect(RB.apiCall).not.toHaveBeenCalled();
            jasmineCore.expect($.ajax).not.toHaveBeenCalled();
          });
          jasmineCore.it('With description', async function () {
            jasmineCore.spyOn(RB, 'apiCall').and.callThrough();
            jasmineCore.spyOn($, 'ajax').and.callFake(request => {
              jasmineCore.expect(request.type).toBe('PUT');
              jasmineCore.expect(request.data.status).toBe('submitted');
              jasmineCore.expect(request.data.close_description).toBe('test');
              request.success({
                review_request: {
                  id: 1,
                  links: {}
                },
                stat: 'ok'
              });
            });
            await reviewRequest.close({
              description: 'test',
              type: RB.ReviewRequest.CLOSE_SUBMITTED
            });
            jasmineCore.expect(RB.apiCall).toHaveBeenCalled();
            jasmineCore.expect($.ajax).toHaveBeenCalled();
          });
          jasmineCore.it('With callbacks', function (done) {
            jasmineCore.spyOn(RB, 'apiCall').and.callThrough();
            jasmineCore.spyOn($, 'ajax').and.callFake(request => {
              jasmineCore.expect(request.type).toBe('PUT');
              jasmineCore.expect(request.data.status).toBe('discarded');
              jasmineCore.expect(request.data.description).toBe(undefined);
              request.success({
                review_request: {
                  id: 1,
                  links: {}
                },
                stat: 'ok'
              });
            });
            jasmineCore.spyOn(console, 'warn');
            reviewRequest.close({
              error: () => done.fail(),
              success: () => {
                jasmineCore.expect(RB.apiCall).toHaveBeenCalled();
                jasmineCore.expect($.ajax).toHaveBeenCalled();
                jasmineCore.expect(console.warn).toHaveBeenCalled();
                done();
              },
              type: RB.ReviewRequest.CLOSE_DISCARDED
            });
          });
        });
      });
    });

    jasmineSuites.suite('rb/pages/views/PageView', function () {
      const pageSidebarTemplate = `<div class="rb-c-page-sidebar test-page-sidebar">
 <div class="rb-c-page-sidebar__panes">
  <div class="rb-c-page-sidebar__pane -is-shown"
       id="page-sidebar-main-pane">
   <div class="rb-c-page-sidebar__pane-content"></div>
  </div>
 </div>
</div>`;
      let $body;
      let $headerBar;
      let $pageSidebar;
      let $pageContainer;
      let $pageContent;
      let pageView;
      jasmineCore.beforeEach(function () {
        $body = $('<body>').appendTo($testsScratch);
        $headerBar = $('<div>').appendTo($body);
        $pageContainer = $('<div id="page-container">').css('padding', 0) // Normalize padding for some tests.
        .appendTo($body);
        $pageContent = $('<div>').appendTo($pageContainer);
        $pageSidebar = $(pageSidebarTemplate).appendTo($body);
        jasmineCore.spyOn(RB.HeaderView.prototype, '_ensureSingleton');
        pageView = new RB.PageView({
          $body: $body,
          $headerBar: $headerBar,
          $pageContainer: $pageContainer,
          $pageContent: $pageContent,
          $pageSidebar: $pageSidebar
        });
      });
      jasmineCore.afterEach(function () {
        pageView.remove();
      });
      jasmineCore.describe('Rendering', function () {
        jasmineCore.it('Default state', function () {
          jasmineCore.expect(pageView.rendered).toBe(false);
          pageView.render();
          jasmineCore.expect(pageView.hasSidebar).toBe(false);
          jasmineCore.expect(pageView.isFullPage).toBe(false);
          jasmineCore.expect(pageView.rendered).toBe(true);
          jasmineCore.expect(pageView.inMobileMode).toBe(false);
          jasmineCore.expect(pageView.headerView).not.toBe(null);
          jasmineCore.expect(pageView.$mainSidebar.length).toBe(1);
          jasmineCore.expect(pageView.$pageContainer.length).toBe(1);
          jasmineCore.expect(pageView.$pageContent.length).toBe(1);
          jasmineCore.expect(pageView._$pageSidebar.length).toBe(1);
          jasmineCore.expect(pageView._$pageSidebarPanes.length).toBe(1);
          jasmineCore.expect(pageView._$mainSidebarPane.length).toBe(1);
        });
        jasmineCore.describe('With full-page-content', function () {
          let $mainSidebarPane;
          jasmineCore.beforeEach(() => {
            $mainSidebarPane = $pageSidebar.find('#page-sidebar-main-pane');
            jasmineCore.expect($mainSidebarPane.length).toBe(1);
            document.body.classList.remove('-is-loaded');
          });
          jasmineCore.afterEach(() => {
            document.body.classList.add('-is-loaded');
          });
          jasmineCore.it('Using body.-is-content-full-page', function () {
            $body.addClass('-is-content-full-page');
            pageView.render();
            $body.removeClass('-is-loaded');
            jasmineCore.expect(pageView.isFullPage).toBe(true);
            jasmineCore.expect($mainSidebarPane.css('display')).toBe('block');
            jasmineCore.expect($pageContainer.css('display')).toBe('block');
            jasmineCore.expect($mainSidebarPane.css('visibility')).toBe('hidden');
            jasmineCore.expect($pageContainer.css('visibility')).toBe('hidden');
          });
          jasmineCore.it('Using legacy body.full-page-content', function () {
            $body.addClass('full-page-content');
            pageView.render();
            $body.removeClass('-is-loaded');
            jasmineCore.expect(pageView.isFullPage).toBe(true);
            jasmineCore.expect($mainSidebarPane.css('display')).toBe('block');
            jasmineCore.expect($pageContainer.css('display')).toBe('block');
            jasmineCore.expect($mainSidebarPane.css('visibility')).toBe('hidden');
            jasmineCore.expect($pageContainer.css('visibility')).toBe('hidden');
          });
          jasmineCore.it('Using body.-is-content-full-page and -is-loaded', function () {
            $body.addClass('-is-content-full-page');
            pageView.render();
            jasmineCore.expect($body[0]).toHaveClass('-is-loaded');
            jasmineCore.expect(pageView.isFullPage).toBe(true);
            jasmineCore.expect($mainSidebarPane.css('display')).toBe('block');
            jasmineCore.expect($pageContainer.css('display')).toBe('block');
            jasmineCore.expect($mainSidebarPane.css('visibility')).toBe('visible');
            jasmineCore.expect($pageContainer.css('visibility')).toBe('visible');
          });
        });
        jasmineCore.describe('With sidebar', function () {
          jasmineCore.it('Using body.-has-sidebar', function () {
            $body.addClass('-has-sidebar');
            pageView.render();
            jasmineCore.expect(pageView.hasSidebar).toBe(true);
          });
          jasmineCore.it('Using legacy body.has-sidebar', function () {
            $body.addClass('has-sidebar');
            pageView.render();
            jasmineCore.expect(pageView.hasSidebar).toBe(true);
          });
        });
      });
      jasmineCore.describe('Drawers', function () {
        jasmineCore.beforeEach(function () {
          $body.addClass('-has-sidebar');
        });
        jasmineCore.describe('Setting drawer', function () {
          jasmineCore.it('In mobile mode', function () {
            pageView.render();
            pageView.inMobileMode = true;
            pageView.setDrawer(new RB.DrawerView());
            jasmineCore.expect($body.children('.rb-c-drawer').length).toBe(1);
          });
          jasmineCore.it('In desktop mode', function () {
            pageView.render();
            pageView.inMobileMode = false;
            pageView.setDrawer(new RB.DrawerView());
            const $panes = $pageSidebar.children('.rb-c-page-sidebar__panes');
            jasmineCore.expect($panes.children('.rb-c-drawer').length).toBe(1);
          });
        });
        jasmineCore.describe('State changes', function () {
          let drawer;
          jasmineCore.beforeEach(function () {
            drawer = new RB.DrawerView();
            pageView.render();
            jasmineCore.spyOn(pageView, '_updateSize');
            pageView.setDrawer(drawer);
            jasmineCore.expect(pageView._updateSize).not.toHaveBeenCalled();
          });
          jasmineCore.it('Showing', function () {
            drawer.show();
            jasmineCore.expect(pageView._updateSize).toHaveBeenCalled();
          });
          jasmineCore.it('Hiding', function () {
            drawer.show();
            jasmineCore.expect(pageView._updateSize).toHaveBeenCalled();
          });
        });
      });
      jasmineCore.describe('Events', function () {
        jasmineCore.describe('mobileModeChanged', function () {
          let eventHandler;
          jasmineCore.beforeEach(function () {
            eventHandler = jasmineCore.jasmine.createSpy('handler');
            pageView.render();
            pageView.on('inMobileModeChanged', eventHandler);
            jasmineCore.spyOn(pageView, '_updateSize');
            jasmineCore.spyOn(pageView, 'onMobileModeChanged');
          });
          jasmineCore.it('To mobile mode', function () {
            pageView.inMobileMode = false;
            pageView.headerView.trigger('mobileModeChanged', true);
            jasmineCore.expect(pageView.inMobileMode).toBe(true);
            jasmineCore.expect(pageView._updateSize).toHaveBeenCalled();
            jasmineCore.expect(pageView.onMobileModeChanged).toHaveBeenCalledWith(true);
            jasmineCore.expect(eventHandler).toHaveBeenCalledWith(true);
          });
          jasmineCore.it('To desktop mode', function () {
            pageView.inMobileMode = true;
            pageView.headerView.trigger('mobileModeChanged', false);
            jasmineCore.expect(pageView.inMobileMode).toBe(false);
            jasmineCore.expect(pageView._updateSize).toHaveBeenCalled();
            jasmineCore.expect(pageView.onMobileModeChanged).toHaveBeenCalledWith(false);
            jasmineCore.expect(eventHandler).toHaveBeenCalledWith(false);
          });
        });
        jasmineCore.describe('resize', function () {
          jasmineCore.beforeEach(function () {
            pageView.render();
            jasmineCore.spyOn(pageView, '_updateSize').and.callThrough();
            jasmineCore.spyOn(pageView, 'onResize');

            /* Force some heights and offsets. */
            $pageContainer.css('height', 'auto');
            $pageSidebar.css('height', 'auto');
            jasmineCore.spyOn(pageView.$window, 'height').and.callFake(() => 1000);
            jasmineCore.spyOn($pageContainer, 'offset').and.callFake(() => ({
              left: 0,
              top: 20
            }));
            jasmineCore.spyOn($pageSidebar, 'offset').and.callFake(() => ({
              left: 0,
              top: 10
            }));
          });
          jasmineCore.describe('In mobile mode', function () {
            jasmineCore.beforeEach(function () {
              pageView.inMobileMode = true;
            });
            jasmineCore.it('Default state', function () {
              pageView.$window.triggerHandler('resize');
              jasmineCore.expect(pageView._updateSize).toHaveBeenCalled();
              jasmineCore.expect($pageContainer[0].style.height).toBe('');
              jasmineCore.expect($pageSidebar[0].style.height).toBe('');
              jasmineCore.expect(pageView.onResize).toHaveBeenCalled();
            });
            jasmineCore.describe('In full-page content mode', function () {
              let drawer;
              jasmineCore.beforeEach(function () {
                pageView.isFullPage = true;
                $body.addClass('-is-loaded');
                drawer = new RB.DrawerView();

                /*
                 * We're probably not running tests in actual mobile
                 * mode, so the stylesheet setting a minimum height on
                 * the drawer won't take effect. Instead, force one.
                 */
                drawer.$el.outerHeight(300);
              });
              jasmineCore.it('Without drawer', function () {
                pageView.$window.triggerHandler('resize');
                jasmineCore.expect(pageView._updateSize).toHaveBeenCalled();
                jasmineCore.expect($pageContainer[0].style.height).toBe('980px');
                jasmineCore.expect($pageSidebar[0].style.height).toBe('');
                jasmineCore.expect(pageView.onResize).toHaveBeenCalled();
              });
              jasmineCore.it('With open drawer', function () {
                pageView.hasSidebar = true;
                pageView.setDrawer(drawer);
                drawer.show();
                pageView.$window.triggerHandler('resize');
                jasmineCore.expect(pageView._updateSize).toHaveBeenCalled();
                jasmineCore.expect($pageContainer[0].style.height).toBe('680px');
                jasmineCore.expect($pageSidebar[0].style.height).toBe('');
                jasmineCore.expect(pageView.onResize).toHaveBeenCalled();
              });
              jasmineCore.it('With closed drawer', function () {
                pageView.hasSidebar = true;
                pageView.setDrawer(drawer);
                pageView.$window.triggerHandler('resize');
                jasmineCore.expect(pageView._updateSize).toHaveBeenCalled();
                jasmineCore.expect($pageContainer[0].style.height).toBe('980px');
                jasmineCore.expect($pageSidebar[0].style.height).toBe('');
                jasmineCore.expect(pageView.onResize).toHaveBeenCalled();
              });
            });
          });
          jasmineCore.describe('In desktop mode', function () {
            jasmineCore.beforeEach(function () {
              pageView.inMobileMode = false;
            });
            jasmineCore.it('Default state', function () {
              pageView.$window.triggerHandler('resize');
              jasmineCore.expect(pageView._updateSize).toHaveBeenCalled();
              jasmineCore.expect($pageContainer[0].style.height).toBe('');
              jasmineCore.expect($pageSidebar[0].style.height).toBe('');
              jasmineCore.expect(pageView.onResize).toHaveBeenCalled();
            });
            jasmineCore.it('In full-page content mode', function () {
              pageView.isFullPage = true;
              pageView.$window.triggerHandler('resize');
              jasmineCore.expect(pageView._updateSize).toHaveBeenCalled();
              jasmineCore.expect($pageContainer[0].style.height).toBe('980px');
              jasmineCore.expect($pageSidebar[0].style.height).toBe('990px');
              jasmineCore.expect(pageView.onResize).toHaveBeenCalled();
            });
          });
        });
      });
    });

    jasmineSuites.suite('rb/diffviewer/collections/DiffReviewableCollection', function () {
      jasmineCore.describe('Construction', function () {
        jasmineCore.it('Sets reviewRequest', function () {
          const reviewRequest = new RB.ReviewRequest();
          const collection = new RB.DiffReviewableCollection([], {
            reviewRequest: reviewRequest
          });
          jasmineCore.expect(collection.reviewRequest).toBe(reviewRequest);
        });
      });
      jasmineCore.describe('watchFiles', function () {
        let collection;
        let files;
        jasmineCore.beforeEach(function () {
          collection = new RB.DiffReviewableCollection([], {
            reviewRequest: new RB.ReviewRequest()
          });
          files = new RB.DiffFileCollection();
        });
        jasmineCore.it('Initially populates', function () {
          jasmineCore.spyOn(collection, '_populateFromFiles');
          collection.watchFiles(files);
          jasmineCore.expect(collection._populateFromFiles).toHaveBeenCalled();
        });
        jasmineCore.it('Populates on files.reset', function () {
          jasmineCore.spyOn(collection, 'trigger');
          jasmineCore.spyOn(collection, 'reset');
          collection.watchFiles(files);
          files.reset([new RB.DiffFile({
            filediff: {
              id: 300,
              revision: 1
            },
            id: 100,
            index: 1
          }), new RB.DiffFile({
            filediff: {
              id: 301,
              revision: 1
            },
            id: 101,
            index: 2,
            interfilediff: {
              id: 400,
              revision: 2
            },
            serializedCommentBlocks: {
              '2-2': [{
                comment_id: 1,
                issue_opened: false,
                line: 2,
                localdraft: false,
                num_lines: 2,
                review_id: 1,
                text: 'Comment',
                user: {
                  name: 'testuser'
                }
              }]
            }
          }), new RB.DiffFile({
            baseFileDiffID: 123,
            filediff: {
              id: 302,
              revision: 2
            },
            forceInterdiff: true,
            forceInterdiffRevision: 1,
            id: 102,
            index: 3
          })]);
          jasmineCore.expect(collection.reset).toHaveBeenCalled();
          jasmineCore.expect(collection.trigger).toHaveBeenCalledWith('populating');
          jasmineCore.expect(collection.trigger).toHaveBeenCalledWith('populated');
          jasmineCore.expect(collection.length).toBe(3);
          let diffReviewable = collection.at(0);
          jasmineCore.expect(diffReviewable.get('baseFileDiffID')).toBe(null);
          jasmineCore.expect(diffReviewable.get('file').id).toBe(100);
          jasmineCore.expect(diffReviewable.get('reviewRequest')).toBe(collection.reviewRequest);
          jasmineCore.expect(diffReviewable.get('fileDiffID')).toBe(300);
          jasmineCore.expect(diffReviewable.get('interFileDiffID')).toBe(null);
          jasmineCore.expect(diffReviewable.get('revision')).toBe(1);
          jasmineCore.expect(diffReviewable.get('interdiffRevision')).toBe(null);
          diffReviewable = collection.at(1);
          jasmineCore.expect(diffReviewable.get('baseFileDiffID')).toBe(null);
          jasmineCore.expect(diffReviewable.get('file').id).toBe(101);
          jasmineCore.expect(diffReviewable.get('reviewRequest')).toBe(collection.reviewRequest);
          jasmineCore.expect(diffReviewable.get('fileDiffID')).toBe(301);
          jasmineCore.expect(diffReviewable.get('interFileDiffID')).toBe(400);
          jasmineCore.expect(diffReviewable.get('revision')).toBe(1);
          jasmineCore.expect(diffReviewable.get('interdiffRevision')).toBe(2);
          jasmineCore.expect(diffReviewable.get('serializedCommentBlocks')).toEqual({
            '2-2': [{
              comment_id: 1,
              issue_opened: false,
              line: 2,
              localdraft: false,
              num_lines: 2,
              review_id: 1,
              text: 'Comment',
              user: {
                name: 'testuser'
              }
            }]
          });
          diffReviewable = collection.at(2);
          jasmineCore.expect(diffReviewable.get('baseFileDiffID')).toBe(123);
          jasmineCore.expect(diffReviewable.get('file').id).toBe(102);
          jasmineCore.expect(diffReviewable.get('reviewRequest')).toBe(collection.reviewRequest);
          jasmineCore.expect(diffReviewable.get('fileDiffID')).toBe(302);
          jasmineCore.expect(diffReviewable.get('interFileDiffID')).toBe(null);
          jasmineCore.expect(diffReviewable.get('revision')).toBe(2);
          jasmineCore.expect(diffReviewable.get('interdiffRevision')).toBe(1);
        });
      });
    });

    jasmineSuites.suite('rb/models/CommentEditor', function () {
      let editor;
      let reviewRequest;
      let comment;
      function createComment() {
        return new RB.BaseComment({
          parentObject: new RB.BaseResource({
            'public': true
          })
        });
      }
      jasmineCore.beforeEach(function () {
        reviewRequest = new RB.ReviewRequest();
        editor = new RB.CommentEditor({
          canEdit: true,
          reviewRequest: reviewRequest
        });
      });
      jasmineCore.describe('Attribute defaults', function () {
        jasmineCore.describe('canEdit', function () {
          jasmineCore.it('When logged in and hasDraft=false', function () {
            RB.UserSession.instance.set('authenticated', true);
            editor = new RB.CommentEditor({
              reviewRequest: reviewRequest
            });
            jasmineCore.expect(editor.get('canEdit')).toBe(true);
          });
          jasmineCore.it('When logged in and hasDraft=true', function () {
            RB.UserSession.instance.set('authenticated', true);
            reviewRequest.set('hasDraft', true);
            editor = new RB.CommentEditor({
              reviewRequest: reviewRequest
            });
            jasmineCore.expect(editor.get('canEdit')).toBe(true);
          });
          jasmineCore.it('When logged out', function () {
            RB.UserSession.instance.set('authenticated', false);
            editor = new RB.CommentEditor({
              reviewRequest: reviewRequest
            });
            jasmineCore.expect(editor.get('canEdit')).toBe(false);
          });
          jasmineCore.it('With explicitly set value', function () {
            RB.UserSession.instance.set('authenticated', false);
            editor = new RB.CommentEditor({
              canEdit: true,
              reviewRequest: reviewRequest
            });
            jasmineCore.expect(editor.get('canEdit')).toBe(true);
          });
        });
        jasmineCore.describe('openIssue', function () {
          jasmineCore.it('When user preference is true', function () {
            RB.UserSession.instance.set('commentsOpenAnIssue', true);
            editor = new RB.CommentEditor({
              reviewRequest: reviewRequest
            });
            jasmineCore.expect(editor.get('openIssue')).toBe(true);
          });
          jasmineCore.it('When user preference is false', function () {
            RB.UserSession.instance.set('commentsOpenAnIssue', false);
            editor = new RB.CommentEditor({
              reviewRequest: reviewRequest
            });
            jasmineCore.expect(editor.get('openIssue')).toBe(false);
          });
          jasmineCore.it('With explicitly set value', function () {
            RB.UserSession.instance.set('commentsOpenAnIssue', false);
            editor = new RB.CommentEditor({
              openIssue: true,
              reviewRequest: reviewRequest
            });
            jasmineCore.expect(editor.get('openIssue')).toBe(true);
          });
          jasmineCore.it('When reloading the page with explicitly set value', function () {
            RB.UserSession.instance.set('commentsOpenAnIssue', true);
            comment = createComment();
            comment.set({
              issueOpened: false,
              loaded: false
            });
            editor = new RB.CommentEditor({
              comment: comment,
              reviewRequest: reviewRequest
            });
            jasmineCore.expect(editor.get('openIssue')).toBe(false);
          });
        });
        jasmineCore.describe('richText', function () {
          jasmineCore.it('When user preference is true', function () {
            RB.UserSession.instance.set('defaultUseRichText', true);
            editor = new RB.CommentEditor({
              reviewRequest: reviewRequest
            });
            jasmineCore.expect(editor.get('richText')).toBe(true);
          });
          jasmineCore.it('When user preference is false', function () {
            RB.UserSession.instance.set('defaultUseRichText', false);
            editor = new RB.CommentEditor({
              reviewRequest: reviewRequest
            });
            jasmineCore.expect(editor.get('richText')).toBe(false);
          });
          jasmineCore.it('With explicitly set value', function () {
            RB.UserSession.instance.set('defaultUseRichText', false);
            editor = new RB.CommentEditor({
              reviewRequest: reviewRequest,
              richText: true
            });
            jasmineCore.expect(editor.get('richText')).toBe(true);
          });
        });
      });
      jasmineCore.describe('Loading comment', function () {
        jasmineCore.describe('With comment richText=true', function () {
          let comment;
          jasmineCore.beforeEach(function () {
            comment = createComment();
            comment.set({
              id: 123,
              loaded: true,
              markdownTextFields: {
                text: 'this \\_is\\_ a _test_'
              },
              rawTextFields: {
                text: 'this \\_is\\_ a _test_'
              },
              richText: true,
              text: '<p>this _is_ a <em>test</em></p>'
            });
          });
          jasmineCore.it('When defaultUseRichText=true', function () {
            RB.UserSession.instance.set('defaultUseRichText', true);
            editor.set('comment', comment);
            editor.beginEdit();
            jasmineCore.expect(editor.get('dirty')).toBe(false);
            jasmineCore.expect(editor.get('richText')).toBe(true);
            jasmineCore.expect(editor.get('text')).toBe('this \\_is\\_ a _test_');
          });
          jasmineCore.it('When defaultUseRichText=false', function () {
            RB.UserSession.instance.set('defaultUseRichText', false);
            editor.set('comment', comment);
            editor.beginEdit();
            jasmineCore.expect(editor.get('dirty')).toBe(false);
            jasmineCore.expect(editor.get('richText')).toBe(true);
            jasmineCore.expect(editor.get('text')).toBe('this \\_is\\_ a _test_');
          });
        });
        jasmineCore.describe('With comment richText=false', function () {
          let comment;
          jasmineCore.beforeEach(function () {
            comment = createComment();
            comment.set({
              id: 123,
              loaded: true,
              markdownTextFields: {
                text: 'this \\_is\\_ a \\_test\\_'
              },
              rawTextFields: {
                text: 'this _is_ a _test_'
              },
              richText: false,
              text: '<p>this _is_ a test</p>'
            });
          });
          jasmineCore.it('When defaultUseRichText=true', function () {
            RB.UserSession.instance.set('defaultUseRichText', true);
            editor.set('comment', comment);
            editor.beginEdit();
            jasmineCore.expect(editor.get('dirty')).toBe(false);
            jasmineCore.expect(editor.get('richText')).toBe(true);
            jasmineCore.expect(editor.get('text')).toBe('this \\_is\\_ a \\_test\\_');
          });
          jasmineCore.it('When defaultUseRichText=false', function () {
            RB.UserSession.instance.set('defaultUseRichText', false);
            editor.set('comment', comment);
            editor.beginEdit();
            jasmineCore.expect(editor.get('dirty')).toBe(false);
            jasmineCore.expect(editor.get('richText')).toBe(false);
            jasmineCore.expect(editor.get('text')).toBe('this _is_ a _test_');
          });
        });
      });
      jasmineCore.describe('Capability states', function () {
        jasmineCore.describe('canDelete', function () {
          jasmineCore.it('When not editing', function () {
            jasmineCore.expect(editor.get('editing')).toBe(false);
            jasmineCore.expect(editor.get('canDelete')).toBe(false);
          });
          jasmineCore.it('When editing new comment', function () {
            editor.set('comment', createComment());
            editor.beginEdit();
            jasmineCore.expect(editor.get('canDelete')).toBe(false);
          });
          jasmineCore.it('When editing existing comment', function () {
            const comment = createComment();
            comment.set({
              id: 123,
              loaded: true
            });
            editor.set('comment', comment);
            editor.beginEdit();
            jasmineCore.expect(editor.get('canDelete')).toBe(true);
          });
          jasmineCore.it('When editing existing comment with canEdit=false', function () {
            const comment = createComment();
            comment.set({
              id: 123,
              loaded: true
            });
            editor.set({
              canEdit: false,
              comment: comment
            });
            jasmineCore.expect(() => editor.beginEdit()).toThrow();
            jasmineCore.expect(console.assert).toHaveBeenCalled();
            jasmineCore.expect(editor.get('canDelete')).toBe(false);
          });
        });
        jasmineCore.describe('canSave', function () {
          jasmineCore.it('When not editing', function () {
            jasmineCore.expect(editor.get('editing')).toBe(false);
            jasmineCore.expect(editor.get('canSave')).toBe(false);
          });
          jasmineCore.it('When editing comment with text', function () {
            const comment = createComment();
            editor.set('comment', comment);
            editor.beginEdit();
            editor.set('text', 'Foo');
            jasmineCore.expect(editor.get('canSave')).toBe(true);
          });
          jasmineCore.it('When editing comment with initial state', function () {
            const comment = createComment();
            editor.set('comment', comment);
            editor.beginEdit();
            jasmineCore.expect(editor.get('canSave')).toBe(false);
          });
          jasmineCore.it('When editing comment without text', function () {
            const comment = createComment();
            editor.set('comment', comment);
            editor.beginEdit();
            editor.set('text', '');
            jasmineCore.expect(editor.get('canSave')).toBe(false);
          });
        });
      });
      jasmineCore.describe('States', function () {
        jasmineCore.describe('dirty', function () {
          jasmineCore.it('Initial state', function () {
            jasmineCore.expect(editor.get('dirty')).toBe(false);
          });
          jasmineCore.it('After new comment', function () {
            const comment = createComment();
            editor.set('dirty', true);
            editor.set('comment', comment);
            jasmineCore.expect(editor.get('dirty')).toBe(false);
          });
          jasmineCore.it('After text change', function () {
            editor.set('comment', createComment());
            editor.beginEdit();
            editor.set('text', 'abc');
            jasmineCore.expect(editor.get('dirty')).toBe(true);
          });
          jasmineCore.it('After toggling Open Issue', function () {
            editor.set('comment', createComment());
            editor.beginEdit();
            editor.set('openIssue', 'true');
            jasmineCore.expect(editor.get('dirty')).toBe(true);
          });
          jasmineCore.it('After saving', async function () {
            const comment = createComment();
            editor.set('comment', comment);
            editor.beginEdit();
            editor.set('text', 'abc');
            jasmineCore.expect(editor.get('dirty')).toBe(true);
            jasmineCore.spyOn(comment, 'save').and.resolveTo();
            await editor.save();
            jasmineCore.expect(editor.get('dirty')).toBe(false);
          });
          jasmineCore.it('After deleting', async function () {
            const comment = createComment();
            comment.set({
              id: 123,
              loaded: true
            });
            editor.set('comment', comment);
            editor.beginEdit();
            editor.set('text', 'abc');
            jasmineCore.expect(editor.get('dirty')).toBe(true);
            jasmineCore.spyOn(comment, 'destroy').and.resolveTo();
            await editor.deleteComment();
            jasmineCore.expect(editor.get('dirty')).toBe(false);
          });
        });
      });
      jasmineCore.describe('Operations', function () {
        jasmineCore.it('setExtraData', function () {
          editor.setExtraData('key1', 'strvalue');
          editor.setExtraData('key2', 42);
          jasmineCore.expect(editor.get('extraData')).toEqual({
            key1: 'strvalue',
            key2: 42
          });
        });
        jasmineCore.it('getExtraData', function () {
          editor.set('extraData', {
            mykey: 'value'
          });
          jasmineCore.expect(editor.getExtraData('mykey')).toBe('value');
        });
        jasmineCore.describe('beginEdit', function () {
          jasmineCore.it('With canEdit=true', function () {
            editor.set({
              canEdit: true,
              comment: createComment()
            });
            editor.beginEdit();
            jasmineCore.expect(console.assert.calls.argsFor(0)[0]).toBeTruthy();
          });
          jasmineCore.it('With canEdit=false', function () {
            editor.set({
              canEdit: false,
              comment: createComment()
            });
            jasmineCore.expect(function () {
              editor.beginEdit();
            }).toThrow();
            jasmineCore.expect(console.assert.calls.argsFor(0)[0]).toBeFalsy();
          });
          jasmineCore.it('With no comment', function () {
            jasmineCore.expect(function () {
              editor.beginEdit();
            }).toThrow();
            jasmineCore.expect(console.assert.calls.argsFor(0)[0]).toBeTruthy();
            jasmineCore.expect(console.assert.calls.argsFor(1)[0]).toBeFalsy();
          });
        });
        jasmineCore.describe('cancel', function () {
          jasmineCore.beforeEach(function () {
            jasmineCore.spyOn(editor, 'close');
            jasmineCore.spyOn(editor, 'trigger');
          });
          jasmineCore.it('With comment', function () {
            const comment = createComment();
            jasmineCore.spyOn(comment, 'destroyIfEmpty');
            editor.set('comment', comment);
            editor.cancel();
            jasmineCore.expect(comment.destroyIfEmpty).toHaveBeenCalled();
            jasmineCore.expect(editor.trigger).toHaveBeenCalledWith('canceled');
            jasmineCore.expect(editor.close).toHaveBeenCalled();
          });
          jasmineCore.it('Without comment', function () {
            editor.cancel();
            jasmineCore.expect(editor.trigger).not.toHaveBeenCalledWith('canceled');
            jasmineCore.expect(editor.close).toHaveBeenCalled();
          });
        });
        jasmineCore.describe('destroy', function () {
          let comment;
          jasmineCore.beforeEach(function () {
            comment = createComment();
            jasmineCore.spyOn(comment, 'destroy').and.resolveTo();
            jasmineCore.spyOn(editor, 'close');
            jasmineCore.spyOn(editor, 'trigger');
          });
          jasmineCore.it('With canDelete=false', async function () {
            /* Set these in order, to override canDelete. */
            editor.set('comment', comment);
            editor.set('canDelete', false);
            await expectAsync(editor.deleteComment()).toBeRejectedWith(Error('deleteComment() called when canDelete is false.'));
            jasmineCore.expect(console.assert.calls.argsFor(0)[0]).toBeFalsy();
            jasmineCore.expect(comment.destroy).not.toHaveBeenCalled();
            jasmineCore.expect(editor.trigger).not.toHaveBeenCalledWith('deleted');
            jasmineCore.expect(editor.close).not.toHaveBeenCalled();
          });
          jasmineCore.it('With canDelete=true', async function () {
            /* Set these in order, to override canDelete. */
            editor.set('comment', comment);
            editor.set('canDelete', true);
            await editor.deleteComment();
            jasmineCore.expect(console.assert.calls.argsFor(0)[0]).toBeTruthy();
            jasmineCore.expect(comment.destroy).toHaveBeenCalled();
            jasmineCore.expect(editor.trigger).toHaveBeenCalledWith('deleted');
            jasmineCore.expect(editor.close).toHaveBeenCalled();
          });
        });
        jasmineCore.describe('save', function () {
          let comment;
          jasmineCore.beforeEach(function () {
            comment = createComment();
            jasmineCore.spyOn(comment, 'save').and.resolveTo();
            jasmineCore.spyOn(editor, 'trigger');
          });
          jasmineCore.it('With canSave=false', async function () {
            /* Set these in order, to override canSave. */
            editor.set('comment', comment);
            editor.set('canSave', false);
            await expectAsync(editor.save()).toBeRejectedWith(Error('save() called when canSave is false.'));
            jasmineCore.expect(console.assert.calls.argsFor(0)[0]).toBeFalsy();
            jasmineCore.expect(comment.save).not.toHaveBeenCalled();
            jasmineCore.expect(editor.trigger).not.toHaveBeenCalledWith('saved');
          });
          jasmineCore.it('With canSave=true', async function () {
            /* Set these in order, to override canSave. */
            const text = 'My text';
            const issueOpened = true;
            comment.set('issueOpened', false);
            editor.set('comment', comment);
            editor.set({
              canSave: true,
              issue_opened: issueOpened,
              richText: true,
              text: text
            });
            editor.setExtraData('mykey', 'myvalue');
            await editor.save();
            jasmineCore.expect(console.assert.calls.argsFor(0)[0]).toBeTruthy();
            jasmineCore.expect(comment.save).toHaveBeenCalled();
            jasmineCore.expect(comment.get('text')).toBe(text);
            jasmineCore.expect(comment.get('issueOpened')).toBe(issueOpened);
            jasmineCore.expect(comment.get('richText')).toBe(true);
            jasmineCore.expect(comment.get('extraData')).toEqual({
              mykey: 'myvalue',
              require_verification: false
            });
            jasmineCore.expect(editor.get('dirty')).toBe(false);
            jasmineCore.expect(editor.trigger).toHaveBeenCalledWith('saved');
          });
          jasmineCore.it('With callbacks', function (done) {
            /* Set these in order, to override canSave. */
            const text = 'My text';
            const issueOpened = true;
            comment.set('issueOpened', false);
            editor.set('comment', comment);
            editor.set({
              canSave: true,
              issue_opened: issueOpened,
              richText: true,
              text: text
            });
            editor.setExtraData('mykey', 'myvalue');
            jasmineCore.spyOn(console, 'warn');
            editor.save({
              error: () => done.fail(),
              success: () => {
                jasmineCore.expect(console.assert.calls.argsFor(0)[0]).toBeTruthy();
                jasmineCore.expect(comment.save).toHaveBeenCalled();
                jasmineCore.expect(comment.get('text')).toBe(text);
                jasmineCore.expect(comment.get('issueOpened')).toBe(issueOpened);
                jasmineCore.expect(comment.get('richText')).toBe(true);
                jasmineCore.expect(comment.get('extraData')).toEqual({
                  mykey: 'myvalue',
                  require_verification: false
                });
                jasmineCore.expect(editor.get('dirty')).toBe(false);
                jasmineCore.expect(editor.trigger).toHaveBeenCalledWith('saved');
                jasmineCore.expect(console.warn).toHaveBeenCalled();
                done();
              }
            });
          });
        });
      });
    });

    jasmineSuites.suite('rb/reviews/models/CommentIssueManager', () => {
      let commentIssueManager;
      let reviewRequest;
      let review;
      jasmineCore.beforeEach(() => {
        reviewRequest = new RB.ReviewRequest();
        commentIssueManager = new RB.CommentIssueManager({
          reviewRequest: reviewRequest
        });
        review = reviewRequest.createReview(123);
        jasmineCore.spyOn(reviewRequest, 'ready').and.resolveTo();
        jasmineCore.spyOn(review, 'ready').and.resolveTo();
        jasmineCore.spyOn(reviewRequest, 'createReview').and.callFake(() => review);
      });
      jasmineCore.describe('Methods', () => {
        jasmineCore.describe('getOrCreateComment', () => {
          jasmineCore.it('Caches results', () => {
            const comment1 = commentIssueManager.getOrCreateComment({
              commentID: 123,
              commentType: RB.CommentIssueManagerCommentType.DIFF,
              reviewID: 456
            });
            const comment2 = commentIssueManager.getOrCreateComment({
              commentID: 123,
              commentType: RB.CommentIssueManagerCommentType.DIFF,
              reviewID: 456
            });

            /* These should be the same instance. */
            jasmineCore.expect(comment1).toBe(comment2);
            jasmineCore.expect(comment1.cid).toBe(comment2.cid);

            /* These should all trigger new objects. */
            const comment3 = commentIssueManager.getOrCreateComment({
              commentID: 456,
              commentType: RB.CommentIssueManagerCommentType.DIFF,
              reviewID: 456
            });
            jasmineCore.expect(comment1).not.toBe(comment3);
            jasmineCore.expect(comment1.cid).not.toBe(comment3.cid);
            const comment4 = commentIssueManager.getOrCreateComment({
              commentID: 123,
              commentType: RB.CommentIssueManagerCommentType.GENERAL,
              reviewID: 456
            });
            jasmineCore.expect(comment1).not.toBe(comment4);
            jasmineCore.expect(comment1.cid).not.toBe(comment4.cid);
          });
          jasmineCore.it('With diff comments', () => {
            const comment = commentIssueManager.getOrCreateComment({
              commentID: 123,
              commentType: RB.CommentIssueManagerCommentType.DIFF,
              reviewID: 456
            });
            jasmineCore.expect(comment).toBeInstanceOf(RB.DiffComment);
          });
        });
        jasmineCore.describe('setCommentIssueStatus', () => {
          jasmineCore.it('With diff comment', async () => {
            const onAnyUpdated = jasmine.createSpy('onAnyUpdated');
            const onCommentUpdated = jasmine.createSpy('onCommentUpdated');
            const onOtherUpdated = jasmine.createSpy('onOtherUpdated');
            const onLegacyUpdated = jasmine.createSpy('onLegacyUpdated');
            commentIssueManager.on({
              'anyIssueStatusUpdated': onAnyUpdated,
              'issueStatusUpdated:diff_comments:456': onCommentUpdated,
              'issueStatusUpdated:diff_comments:789': onOtherUpdated,
              'issueStatusUpdated': onLegacyUpdated
            });
            const comment = review.createDiffComment({
              beginLineNum: 1,
              endLineNum: 2,
              fileDiffID: 42,
              id: 456
            });
            comment.set('issueStatus', RB.CommentIssueStatusType.OPEN);
            jasmineCore.spyOn(comment, 'ready').and.resolveTo();
            jasmineCore.spyOn(comment, 'save').and.resolveTo({
              diff_comment: {
                timestamp: '2024-04-08T01:20:01Z'
              }
            });
            jasmineCore.spyOn(review, 'createDiffComment').and.callFake(() => comment);
            await commentIssueManager.setCommentIssueStatus({
              commentID: 456,
              commentType: RB.CommentIssueManagerCommentType.DIFF,
              newIssueStatus: RB.CommentIssueStatusType.RESOLVED,
              reviewID: 123
            });
            jasmineCore.expect(comment.get('issueStatus')).toBe(RB.CommentIssueStatusType.RESOLVED);
            jasmineCore.expect(comment.save).toHaveBeenCalledWith({
              attrs: ['issueStatus']
            });
            jasmineCore.expect(onAnyUpdated).toHaveBeenCalledWith({
              comment: comment,
              commentType: RB.CommentIssueManagerCommentType.DIFF,
              newIssueStatus: RB.CommentIssueStatusType.RESOLVED,
              oldIssueStatus: RB.CommentIssueStatusType.OPEN,
              timestampStr: '2024-04-08T01:20:01Z'
            });
            jasmineCore.expect(onCommentUpdated).toHaveBeenCalledWith({
              comment: comment,
              commentType: RB.CommentIssueManagerCommentType.DIFF,
              newIssueStatus: RB.CommentIssueStatusType.RESOLVED,
              oldIssueStatus: RB.CommentIssueStatusType.OPEN,
              timestampStr: '2024-04-08T01:20:01Z'
            });
            jasmineCore.expect(onLegacyUpdated).toHaveBeenCalledWith(comment, RB.CommentIssueStatusType.OPEN, '2024-04-08T01:20:01Z', RB.CommentIssueManagerCommentType.DIFF);
            jasmineCore.expect(onOtherUpdated).not.toHaveBeenCalled();
          });
          jasmineCore.it('With file attachment comment', async () => {
            const onAnyUpdated = jasmine.createSpy('onAnyUpdated');
            const onCommentUpdated = jasmine.createSpy('onCommentUpdated');
            const onOtherUpdated = jasmine.createSpy('onOtherUpdated');
            const onLegacyUpdated = jasmine.createSpy('onLegacyUpdated');
            commentIssueManager.on({
              'anyIssueStatusUpdated': onAnyUpdated,
              'issueStatusUpdated:file_attachment_comments:456': onCommentUpdated,
              'issueStatusUpdated:file_attachment_comments:789': onOtherUpdated,
              'issueStatusUpdated': onLegacyUpdated
            });
            const comment = review.createFileAttachmentComment(456);
            comment.set('issueStatus', RB.CommentIssueStatusType.OPEN);
            jasmineCore.spyOn(comment, 'ready').and.resolveTo();
            jasmineCore.spyOn(comment, 'save').and.resolveTo({
              file_attachment_comment: {
                timestamp: '2024-04-08T01:20:01Z'
              }
            });
            jasmineCore.spyOn(review, 'createFileAttachmentComment').and.callFake(() => comment);
            await commentIssueManager.setCommentIssueStatus({
              commentID: 456,
              commentType: RB.CommentIssueManagerCommentType.FILE_ATTACHMENT,
              newIssueStatus: RB.CommentIssueStatusType.RESOLVED,
              reviewID: 123
            });
            jasmineCore.expect(comment.get('issueStatus')).toBe(RB.CommentIssueStatusType.RESOLVED);
            jasmineCore.expect(comment.save).toHaveBeenCalledWith({
              attrs: ['issueStatus']
            });
            jasmineCore.expect(onAnyUpdated).toHaveBeenCalledWith({
              comment: comment,
              commentType: RB.CommentIssueManagerCommentType.FILE_ATTACHMENT,
              newIssueStatus: RB.CommentIssueStatusType.RESOLVED,
              oldIssueStatus: RB.CommentIssueStatusType.OPEN,
              timestampStr: '2024-04-08T01:20:01Z'
            });
            jasmineCore.expect(onCommentUpdated).toHaveBeenCalledWith({
              comment: comment,
              commentType: RB.CommentIssueManagerCommentType.FILE_ATTACHMENT,
              newIssueStatus: RB.CommentIssueStatusType.RESOLVED,
              oldIssueStatus: RB.CommentIssueStatusType.OPEN,
              timestampStr: '2024-04-08T01:20:01Z'
            });
            jasmineCore.expect(onLegacyUpdated).toHaveBeenCalledWith(comment, RB.CommentIssueStatusType.OPEN, '2024-04-08T01:20:01Z', RB.CommentIssueManagerCommentType.FILE_ATTACHMENT);
            jasmineCore.expect(onOtherUpdated).not.toHaveBeenCalled();
          });
          jasmineCore.it('With general comment', async () => {
            const onAnyUpdated = jasmine.createSpy('onAnyUpdated');
            const onCommentUpdated = jasmine.createSpy('onCommentUpdated');
            const onOtherUpdated = jasmine.createSpy('onOtherUpdated');
            const onLegacyUpdated = jasmine.createSpy('onLegacyUpdated');
            commentIssueManager.on({
              'anyIssueStatusUpdated': onAnyUpdated,
              'issueStatusUpdated:general_comments:456': onCommentUpdated,
              'issueStatusUpdated:general_comments:789': onOtherUpdated,
              'issueStatusUpdated': onLegacyUpdated
            });
            const comment = review.createGeneralComment(456);
            comment.set('issueStatus', RB.CommentIssueStatusType.OPEN);
            jasmineCore.spyOn(comment, 'ready').and.resolveTo();
            jasmineCore.spyOn(comment, 'save').and.resolveTo({
              general_comment: {
                timestamp: '2024-04-08T01:20:01Z'
              }
            });
            jasmineCore.spyOn(review, 'createGeneralComment').and.callFake(() => comment);
            await commentIssueManager.setCommentIssueStatus({
              commentID: 456,
              commentType: RB.CommentIssueManagerCommentType.GENERAL,
              newIssueStatus: RB.CommentIssueStatusType.RESOLVED,
              reviewID: 123
            });
            jasmineCore.expect(comment.get('issueStatus')).toBe(RB.CommentIssueStatusType.RESOLVED);
            jasmineCore.expect(comment.save).toHaveBeenCalledWith({
              attrs: ['issueStatus']
            });
            jasmineCore.expect(onAnyUpdated).toHaveBeenCalledWith({
              comment: comment,
              commentType: RB.CommentIssueManagerCommentType.GENERAL,
              newIssueStatus: RB.CommentIssueStatusType.RESOLVED,
              oldIssueStatus: RB.CommentIssueStatusType.OPEN,
              timestampStr: '2024-04-08T01:20:01Z'
            });
            jasmineCore.expect(onCommentUpdated).toHaveBeenCalledWith({
              comment: comment,
              commentType: RB.CommentIssueManagerCommentType.GENERAL,
              newIssueStatus: RB.CommentIssueStatusType.RESOLVED,
              oldIssueStatus: RB.CommentIssueStatusType.OPEN,
              timestampStr: '2024-04-08T01:20:01Z'
            });
            jasmineCore.expect(onLegacyUpdated).toHaveBeenCalledWith(comment, RB.CommentIssueStatusType.OPEN, '2024-04-08T01:20:01Z', RB.CommentIssueManagerCommentType.GENERAL);
            jasmineCore.expect(onOtherUpdated).not.toHaveBeenCalled();
          });
          jasmineCore.it('With screenshot comment', async () => {
            const onAnyUpdated = jasmine.createSpy('onAnyUpdated');
            const onCommentUpdated = jasmine.createSpy('onCommentUpdated');
            const onOtherUpdated = jasmine.createSpy('onOtherUpdated');
            const onLegacyUpdated = jasmine.createSpy('onLegacyUpdated');
            commentIssueManager.on({
              'anyIssueStatusUpdated': onAnyUpdated,
              'issueStatusUpdated:screenshot_comments:456': onCommentUpdated,
              'issueStatusUpdated:screenshot_comments:789': onOtherUpdated,
              'issueStatusUpdated': onLegacyUpdated
            });
            const comment = review.createScreenshotComment(456,
            // id
            42,
            // screenshotID
            0,
            // x
            0,
            // y
            100,
            // width
            100); // height
            comment.set('issueStatus', RB.CommentIssueStatusType.OPEN);
            jasmineCore.spyOn(comment, 'ready').and.resolveTo();
            jasmineCore.spyOn(comment, 'save').and.resolveTo({
              screenshot_comment: {
                timestamp: '2024-04-08T01:20:01Z'
              }
            });
            jasmineCore.spyOn(review, 'createScreenshotComment').and.callFake(() => comment);
            await commentIssueManager.setCommentIssueStatus({
              commentID: 456,
              commentType: RB.CommentIssueManagerCommentType.SCREENSHOT,
              newIssueStatus: RB.CommentIssueStatusType.RESOLVED,
              reviewID: 123
            });
            jasmineCore.expect(comment.get('issueStatus')).toBe(RB.CommentIssueStatusType.RESOLVED);
            jasmineCore.expect(comment.save).toHaveBeenCalledWith({
              attrs: ['issueStatus']
            });
            jasmineCore.expect(onAnyUpdated).toHaveBeenCalledWith({
              comment: comment,
              commentType: RB.CommentIssueManagerCommentType.SCREENSHOT,
              newIssueStatus: RB.CommentIssueStatusType.RESOLVED,
              oldIssueStatus: RB.CommentIssueStatusType.OPEN,
              timestampStr: '2024-04-08T01:20:01Z'
            });
            jasmineCore.expect(onCommentUpdated).toHaveBeenCalledWith({
              comment: comment,
              commentType: RB.CommentIssueManagerCommentType.SCREENSHOT,
              newIssueStatus: RB.CommentIssueStatusType.RESOLVED,
              oldIssueStatus: RB.CommentIssueStatusType.OPEN,
              timestampStr: '2024-04-08T01:20:01Z'
            });
            jasmineCore.expect(onLegacyUpdated).toHaveBeenCalledWith(comment, RB.CommentIssueStatusType.OPEN, '2024-04-08T01:20:01Z', RB.CommentIssueManagerCommentType.SCREENSHOT);
            jasmineCore.expect(onOtherUpdated).not.toHaveBeenCalled();
          });
        });
        jasmineCore.describe('makeCommentEventID', () => {
          jasmineCore.it('With diff comment', () => {
            const comment = new RB.DiffComment({
              id: 456
            });
            jasmineCore.expect(commentIssueManager.makeCommentEventID(comment)).toBe('diff_comments:456');
          });
          jasmineCore.it('With file attachment comment', () => {
            const comment = new RB.FileAttachmentComment({
              id: 456
            });
            jasmineCore.expect(commentIssueManager.makeCommentEventID(comment)).toBe('file_attachment_comments:456');
          });
          jasmineCore.it('With general comment', () => {
            const comment = new RB.GeneralComment({
              id: 456
            });
            jasmineCore.expect(commentIssueManager.makeCommentEventID(comment)).toBe('general_comments:456');
          });
          jasmineCore.it('With screenshot comment', () => {
            const comment = new RB.ScreenshotComment({
              id: 456
            });
            jasmineCore.expect(commentIssueManager.makeCommentEventID(comment)).toBe('screenshot_comments:456');
          });
        });
      });
    });

    jasmineSuites.suite('rb/diffviewer/models/DiffFile', function () {
      jasmineCore.describe('parse', function () {
        jasmineCore.it('API payloads', function () {
          const diffFile = new RB.DiffFile({
            base_filediff_id: 12,
            binary: false,
            deleted: true,
            filediff: {
              id: 38,
              revision: 2
            },
            id: 28,
            index: 3,
            interfilediff: {
              id: 23,
              revision: 4
            },
            modified_filename: 'bar',
            modified_revision: '4',
            newfile: true,
            orig_filename: 'foo',
            orig_revision: '3',
            serialized_comment_blocks: {
              '4-2': [{
                comment_id: 1,
                issue_opened: false,
                line: 4,
                localdraft: false,
                num_lines: 2,
                review_id: 1,
                text: 'Comment',
                user: {
                  name: 'testuser'
                }
              }]
            }
          }, {
            parse: true
          });
          const data = diffFile.attributes;
          jasmineCore.expect(data).not.toBe(undefined);
          jasmineCore.expect(data.baseFileDiffID).toBe(12);
          jasmineCore.expect(data.binary).toBe(false);
          jasmineCore.expect(data.serializedCommentBlocks).toEqual({
            '4-2': [{
              comment_id: 1,
              issue_opened: false,
              line: 4,
              localdraft: false,
              num_lines: 2,
              review_id: 1,
              text: 'Comment',
              user: {
                name: 'testuser'
              }
            }]
          });
          jasmineCore.expect(data.deleted).toBe(true);
          jasmineCore.expect(data.filediff).not.toBe(undefined);
          jasmineCore.expect(data.filediff.id).toBe(38);
          jasmineCore.expect(data.filediff.revision).toBe(2);
          jasmineCore.expect(data.id).toBe(28);
          jasmineCore.expect(data.index).toBe(3);
          jasmineCore.expect(data.interfilediff).not.toBe(undefined);
          jasmineCore.expect(data.interfilediff.id).toBe(23);
          jasmineCore.expect(data.interfilediff.revision).toBe(4);
          jasmineCore.expect(data.modifiedFilename).toBe('bar');
          jasmineCore.expect(data.modifiedRevision).toBe('4'), jasmineCore.expect(data.newfile).toBe(true);
          jasmineCore.expect(data.origFilename).toBe('foo');
          jasmineCore.expect(data.origRevision).toBe('3');
        });
      });
    });

    jasmineSuites.suite('rb/diffviewer/models/DiffReviewable', function () {
      let reviewRequest;
      jasmineCore.beforeEach(function () {
        reviewRequest = new RB.ReviewRequest({
          reviewURL: '/r/1/'
        });
      });
      jasmineCore.describe('getRenderedDiff', function () {
        jasmineCore.it('Without interdiffs', async function () {
          const diffReviewable = new RB.DiffReviewable({
            file: new RB.DiffFile({
              index: 4
            }),
            fileDiffID: 3,
            reviewRequest: reviewRequest,
            revision: 2
          });
          jasmineCore.spyOn($, 'ajax').and.callFake(request => {
            jasmineCore.expect(request.type).toBe('GET');
            jasmineCore.expect(request.url).toBe('/r/1/diff/2/fragment/3/?index=4&_=' + TEMPLATE_SERIAL);
            request.complete({
              responseText: 'abc'
            });
          });
          const html = await diffReviewable.getRenderedDiff();
          jasmineCore.expect($.ajax).toHaveBeenCalled();
          jasmineCore.expect(html).toEqual('abc');
        });
        jasmineCore.it('With interdiffs', async function () {
          const diffReviewable = new RB.DiffReviewable({
            file: new RB.DiffFile({
              index: 4
            }),
            fileDiffID: 3,
            interdiffRevision: 3,
            reviewRequest: reviewRequest,
            revision: 2
          });
          jasmineCore.spyOn($, 'ajax').and.callFake(request => {
            jasmineCore.expect(request.type).toBe('GET');
            jasmineCore.expect(request.url).toBe('/r/1/diff/2-3/fragment/3/?index=4&_=' + TEMPLATE_SERIAL);
            request.complete({
              responseText: 'abc'
            });
          });
          const html = await diffReviewable.getRenderedDiff();
          jasmineCore.expect($.ajax).toHaveBeenCalled();
          jasmineCore.expect(html).toEqual('abc');
        });
        jasmineCore.it('With base FileDiff', async function () {
          const diffReviewable = new RB.DiffReviewable({
            baseFileDiffID: 1,
            file: new RB.DiffFile({
              index: 4
            }),
            fileDiffID: 3,
            reviewRequest: reviewRequest,
            revision: 2
          });
          jasmineCore.spyOn($, 'ajax').and.callFake(request => {
            jasmineCore.expect(request.type).toBe('GET');
            jasmineCore.expect(request.url).toBe('/r/1/diff/2/fragment/3/?base-filediff-id=1&index=4&_=' + TEMPLATE_SERIAL);
            request.complete({
              responseText: 'abc'
            });
          });
          const html = await diffReviewable.getRenderedDiff();
          jasmineCore.expect(html).toEqual('abc');
        });
      });
      jasmineCore.describe('getRenderedDiffFragment', function () {
        jasmineCore.it('Without interdiffs', async function () {
          const diffReviewable = new RB.DiffReviewable({
            file: new RB.DiffFile({
              index: 5
            }),
            fileDiffID: 3,
            reviewRequest: reviewRequest,
            revision: 2
          });
          jasmineCore.spyOn($, 'ajax').and.callFake(request => {
            jasmineCore.expect(request.type).toBe('GET');
            jasmineCore.expect(request.url).toBe('/r/1/diff/2/fragment/3/chunk/4/?index=5&' + 'lines-of-context=6&_=' + TEMPLATE_SERIAL);
            request.complete({
              responseText: 'abc'
            });
          });
          const html = await diffReviewable.getRenderedDiffFragment({
            chunkIndex: 4,
            linesOfContext: 6
          });
          jasmineCore.expect($.ajax).toHaveBeenCalled();
          jasmineCore.expect(html).toEqual('abc');
        });
        jasmineCore.it('With interdiffs', async function () {
          const diffReviewable = new RB.DiffReviewable({
            file: new RB.DiffFile({
              index: 5
            }),
            fileDiffID: 3,
            interFileDiffID: 4,
            interdiffRevision: 3,
            reviewRequest: reviewRequest,
            revision: 2
          });
          jasmineCore.spyOn($, 'ajax').and.callFake(request => {
            jasmineCore.expect(request.type).toBe('GET');
            jasmineCore.expect(request.url).toBe('/r/1/diff/2-3/fragment/3-4/chunk/4/?index=5&' + 'lines-of-context=6&_=' + TEMPLATE_SERIAL);
            request.complete({
              responseText: 'abc'
            });
          });
          const html = await diffReviewable.getRenderedDiffFragment({
            chunkIndex: 4,
            linesOfContext: 6
          });
          jasmineCore.expect($.ajax).toHaveBeenCalled();
          jasmineCore.expect(html).toEqual('abc');
        });
        jasmineCore.it('With base filediff ID', async function () {
          const diffReviewable = new RB.DiffReviewable({
            baseFileDiffID: 123,
            file: new RB.DiffFile({
              index: 5
            }),
            fileDiffID: 3,
            interFileDiffID: 4,
            interdiffRevision: 3,
            reviewRequest: reviewRequest,
            revision: 2
          });
          jasmineCore.spyOn($, 'ajax').and.callFake(request => {
            jasmineCore.expect(request.type).toBe('GET');
            jasmineCore.expect(request.url).toBe('/r/1/diff/2-3/fragment/3-4/chunk/4/' + '?base-filediff-id=123&index=5&' + 'lines-of-context=6&_=' + TEMPLATE_SERIAL);
            request.complete({
              responseText: 'abc'
            });
          });
          const html = await diffReviewable.getRenderedDiffFragment({
            chunkIndex: 4,
            linesOfContext: 6
          });
          jasmineCore.expect($.ajax).toHaveBeenCalled();
          jasmineCore.expect(html).toEqual('abc');
        });
      });
    });

    jasmineSuites.suite('rb/pages/models/DiffViewerPage', function () {
      jasmineCore.describe('parse', function () {
        jasmineCore.it('{}', function () {
          const page = new RB.DiffViewerPage({}, {
            parse: true
          });
          jasmineCore.expect(page.get('allChunksCollapsed')).toBeFalse();
          jasmineCore.expect(page.get('canDownloadDiff')).toBeFalse();
          jasmineCore.expect(page.get('canToggleExtraWhitespace')).toBeFalse();
          jasmineCore.expect(page.get('reviewRequest')).toBeTruthy();
          jasmineCore.expect(page.get('pendingReview')).toBeTruthy();
          jasmineCore.expect(page.get('lastActivityTimestamp')).toBe(null);
          jasmineCore.expect(page.get('checkForUpdates')).toBe(false);
          jasmineCore.expect(page.get('checkUpdatesType')).toBe(null);
          jasmineCore.expect(page.get('numDiffs')).toBe(0);
          jasmineCore.expect(page.commentsHint).not.toBe(null);
          jasmineCore.expect(page.files).not.toBe(null);
          jasmineCore.expect(page.pagination).not.toBe(null);
          jasmineCore.expect(page.revision).not.toBe(null);

          /* These shouldn't be attributes. */
          jasmineCore.expect(page.get('editorData')).toBe(undefined);
          jasmineCore.expect(page.get('reviewRequestData')).toBe(undefined);
        });
        jasmineCore.it('Diff view options', function () {
          const page = new RB.DiffViewerPage({
            allChunksCollapsed: true,
            canToggleExtraWhitespace: true
          }, {
            parse: true
          });
          jasmineCore.expect(page.get('allChunksCollapsed')).toBeTrue();
          jasmineCore.expect(page.get('canToggleExtraWhitespace')).toBeTrue();
        });
        jasmineCore.it('reviewRequestData', function () {
          const page = new RB.DiffViewerPage({
            reviewRequestData: {
              branch: 'my-branch',
              bugTrackerURL: 'http://bugs.example.com/--bug_id--/',
              bugsClosed: [101, 102, 103],
              closeDescription: 'This is closed',
              closeDescriptionRichText: true,
              description: 'This is a description',
              descriptionRichText: true,
              hasDraft: true,
              id: 123,
              lastUpdatedTimestamp: '2017-08-23T15:10:20Z',
              localSitePrefix: 's/foo/',
              public: true,
              repository: {
                id: 200,
                name: 'My repo',
                requiresBasedir: true,
                requiresChangeNumber: true,
                scmtoolName: 'My Tool',
                supportsPostCommit: true
              },
              reviewURL: '/s/foo/r/123/',
              state: 'CLOSE_SUBMITTED',
              summary: 'This is a summary',
              targetGroups: [{
                name: 'Some group',
                url: '/s/foo/groups/some-group/'
              }],
              targetPeople: [{
                url: '/s/foo/users/some-user/',
                username: 'some-user'
              }],
              testingDone: 'This is testing done',
              testingDoneRichText: true,
              visibility: 'ARCHIVED'
            }
          }, {
            parse: true
          });
          jasmineCore.expect(page.get('pendingReview')).toBeTruthy();
          jasmineCore.expect(page.get('checkForUpdates')).toBe(false);
          jasmineCore.expect(page.get('reviewRequestData')).toBe(undefined);

          /* Check the review request. */
          const reviewRequest = page.get('reviewRequest');
          jasmineCore.expect(reviewRequest).toBeTruthy();
          jasmineCore.expect(reviewRequest.id).toBe(123);
          jasmineCore.expect(reviewRequest.url()).toBe('/s/foo/api/review-requests/123/');
          jasmineCore.expect(reviewRequest.get('bugTrackerURL')).toBe('http://bugs.example.com/--bug_id--/');
          jasmineCore.expect(reviewRequest.get('localSitePrefix')).toBe('s/foo/');
          jasmineCore.expect(reviewRequest.get('branch')).toBe('my-branch');
          jasmineCore.expect(reviewRequest.get('bugsClosed')).toEqual([101, 102, 103]);
          jasmineCore.expect(reviewRequest.get('closeDescription')).toBe('This is closed');
          jasmineCore.expect(reviewRequest.get('closeDescriptionRichText')).toBe(true);
          jasmineCore.expect(reviewRequest.get('description')).toBe('This is a description');
          jasmineCore.expect(reviewRequest.get('descriptionRichText')).toBe(true);
          jasmineCore.expect(reviewRequest.get('hasDraft')).toBe(true);
          jasmineCore.expect(reviewRequest.get('lastUpdatedTimestamp')).toBe('2017-08-23T15:10:20Z');
          jasmineCore.expect(reviewRequest.get('public')).toBe(true);
          jasmineCore.expect(reviewRequest.get('reviewURL')).toBe('/s/foo/r/123/');
          jasmineCore.expect(reviewRequest.get('state')).toBe(RB.ReviewRequest.CLOSE_SUBMITTED);
          jasmineCore.expect(reviewRequest.get('summary')).toBe('This is a summary');
          jasmineCore.expect(reviewRequest.get('targetGroups')).toEqual([{
            name: 'Some group',
            url: '/s/foo/groups/some-group/'
          }]);
          jasmineCore.expect(reviewRequest.get('targetPeople')).toEqual([{
            url: '/s/foo/users/some-user/',
            username: 'some-user'
          }]);
          jasmineCore.expect(reviewRequest.get('testingDone')).toBe('This is testing done');
          jasmineCore.expect(reviewRequest.get('testingDoneRichText')).toBe(true);
          jasmineCore.expect(reviewRequest.get('visibility')).toBe(RB.ReviewRequest.VISIBILITY_ARCHIVED);

          /* Check the review request's repository. */
          const repository = reviewRequest.get('repository');
          jasmineCore.expect(repository.id).toBe(200);
          jasmineCore.expect(repository.get('name')).toBe('My repo');
          jasmineCore.expect(repository.get('requiresBasedir')).toBe(true);
          jasmineCore.expect(repository.get('requiresChangeNumber')).toBe(true);
          jasmineCore.expect(repository.get('scmtoolName')).toBe('My Tool');
          jasmineCore.expect(repository.get('supportsPostCommit')).toBe(true);
        });
        jasmineCore.it('extraReviewRequestDraftData', function () {
          const page = new RB.DiffViewerPage({
            extraReviewRequestDraftData: {
              changeDescription: 'Draft change description',
              changeDescriptionRichText: true,
              interdiffLink: '/s/foo/r/123/diff/1-2/'
            }
          }, {
            parse: true
          });
          jasmineCore.expect(page.get('pendingReview')).toBeTruthy();
          jasmineCore.expect(page.get('checkForUpdates')).toBe(false);
          jasmineCore.expect(page.get('reviewRequestData')).toBe(undefined);
          const draft = page.get('reviewRequest').draft;
          jasmineCore.expect(draft.get('changeDescription')).toBe('Draft change description');
          jasmineCore.expect(draft.get('changeDescriptionRichText')).toBe(true);
          jasmineCore.expect(draft.get('interdiffLink')).toBe('/s/foo/r/123/diff/1-2/');
        });
        jasmineCore.it('editorData', function () {
          const page = new RB.DiffViewerPage({
            editorData: {
              changeDescriptionRenderedText: 'Change description',
              closeDescriptionRenderedText: 'This is closed',
              hasDraft: true,
              mutableByUser: true,
              showSendEmail: true,
              statusMutableByUser: true
            }
          }, {
            parse: true
          });
          jasmineCore.expect(page.get('pendingReview')).toBeTruthy();
          jasmineCore.expect(page.get('checkForUpdates')).toBe(false);
          jasmineCore.expect(page.get('editorData')).toBe(undefined);

          /* Check the ReviewRequestEditor. */
          const editor = page.reviewRequestEditor;
          jasmineCore.expect(editor.get('changeDescriptionRenderedText')).toBe('Change description');
          jasmineCore.expect(editor.get('closeDescriptionRenderedText')).toBe('This is closed');
          jasmineCore.expect(editor.get('hasDraft')).toBe(true);
          jasmineCore.expect(editor.get('mutableByUser')).toBe(true);
          jasmineCore.expect(editor.get('showSendEmail')).toBe(true);
          jasmineCore.expect(editor.get('statusMutableByUser')).toBe(true);
        });
        jasmineCore.it('lastActivityTimestamp', function () {
          const page = new RB.DiffViewerPage({
            checkUpdatesType: 'diff',
            lastActivityTimestamp: '2017-08-22T18:20:30Z'
          }, {
            parse: true
          });
          jasmineCore.expect(page.get('lastActivityTimestamp')).toBe('2017-08-22T18:20:30Z');
        });
        jasmineCore.it('checkUpdatesType', function () {
          const page = new RB.DiffViewerPage({
            checkUpdatesType: 'diff'
          }, {
            parse: true
          });
          jasmineCore.expect(page.get('pendingReview')).toBeTruthy();
          jasmineCore.expect(page.get('checkUpdatesType')).toBe('diff');
        });
        jasmineCore.it('comments_hint', function () {
          const page = new RB.DiffViewerPage({
            comments_hint: {
              commits_with_comments: [{
                base_commit_id: '18375be',
                base_commit_pk: 34,
                is_current: false,
                revision: 1,
                tip_commit_id: 'efd582c',
                tip_commit_pk: 39
              }],
              diffsets_with_comments: [{
                is_current: false,
                revision: 1
              }],
              has_other_comments: true,
              interdiffs_with_comments: [{
                is_current: true,
                new_revision: 2,
                old_revision: 1
              }]
            }
          }, {
            parse: true
          });
          const commentsHint = page.commentsHint;
          jasmineCore.expect(commentsHint.get('hasOtherComments')).toBe(true);
          jasmineCore.expect(commentsHint.get('commitsWithComments')).toEqual([{
            baseCommitID: '18375be',
            baseCommitPK: 34,
            isCurrent: false,
            revision: 1,
            tipCommitID: 'efd582c',
            tipCommitPK: 39
          }]), jasmineCore.expect(commentsHint.get('diffsetsWithComments')).toEqual([{
            isCurrent: false,
            revision: 1
          }]);
          jasmineCore.expect(commentsHint.get('interdiffsWithComments')).toEqual([{
            isCurrent: true,
            newRevision: 2,
            oldRevision: 1
          }]);
        });
      });
      jasmineCore.describe('loadDiffRevision', function () {
        let page;
        jasmineCore.beforeEach(function () {
          page = new RB.DiffViewerPage({
            reviewRequestData: {
              id: 123
            }
          }, {
            parse: true
          });
          jasmineCore.spyOn($, 'ajax').and.callFake(url => {
            const query = {};
            const queryParams = url.split('?')[1].split('&');
            for (let i = 0; i < queryParams.length; i++) {
              const pair = queryParams[i].split('=');
              query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
            }
            return {
              done: cb => cb({
                diff_context: {
                  revision: {
                    interdiff_revision: query['interdiff-revision'] || null,
                    revision: query.revision
                  }
                }
              })
            };
          });
        });
        jasmineCore.describe('Generates URL for', function () {
          jasmineCore.it('First page, normal diffs', function () {
            page.loadDiffRevision({
              page: 1,
              revision: 1
            });
            jasmineCore.expect($.ajax).toHaveBeenCalledWith('/api/review-requests/123/diff-context/?revision=1');
          });
          jasmineCore.it('Other page, normal diffs', function () {
            page.loadDiffRevision({
              page: 2,
              revision: 1
            });
            jasmineCore.expect($.ajax).toHaveBeenCalledWith('/api/review-requests/123/diff-context/' + '?revision=1&page=2');
          });
          jasmineCore.it('First page, interdiffs', function () {
            page.loadDiffRevision({
              interdiffRevision: 2,
              page: 1,
              revision: 1
            });
            jasmineCore.expect($.ajax).toHaveBeenCalledWith('/api/review-requests/123/diff-context/' + '?revision=1&interdiff-revision=2');
          });
          jasmineCore.it('Other page, interdiffs', function () {
            page.loadDiffRevision({
              interdiffRevision: 2,
              page: 2,
              revision: 1
            });
            jasmineCore.expect($.ajax).toHaveBeenCalledWith('/api/review-requests/123/diff-context/' + '?revision=1&interdiff-revision=2&page=2');
          });
          jasmineCore.it('Filename patterns', function () {
            page.loadDiffRevision({
              filenamePatterns: '*.txt,src/*',
              page: 2,
              revision: 1
            });
            jasmineCore.expect($.ajax).toHaveBeenCalledWith('/api/review-requests/123/diff-context/' + '?revision=1&page=2&filenames=*.txt%2Csrc%2F*');
          });
        });
        jasmineCore.describe('Sets canDownloadDiff to', function () {
          jasmineCore.it('true for normal diffs', function () {
            page.loadDiffRevision({
              revision: 1
            });
            jasmineCore.expect(page.get('canDownloadDiff')).toBe(true);
          });
          jasmineCore.it('false for interdiffs', function () {
            page.loadDiffRevision({
              interdiffRevision: 2,
              revision: 1
            });
            jasmineCore.expect(page.get('canDownloadDiff')).toBe(false);
          });
        });
      });
    });

    jasmineSuites.suite('rb/models/ReviewRequestEditor', function () {
      let reviewRequest;
      let editor;
      jasmineCore.beforeEach(function () {
        reviewRequest = new RB.ReviewRequest({
          id: 1
        });
        editor = new RB.ReviewRequestEditor({
          reviewRequest: reviewRequest
        });
      });
      jasmineCore.describe('Methods', function () {
        jasmineCore.describe('createFileAttachment', function () {
          jasmineCore.it('With new FileAttachment', function () {
            const fileAttachments = editor.get('fileAttachments');
            jasmineCore.expect(fileAttachments.length).toBe(0);
            const fileAttachment = editor.createFileAttachment();
            jasmineCore.expect(fileAttachments.length).toBe(1);
            jasmineCore.expect(fileAttachments.at(0)).toBe(fileAttachment);
          });
        });
        jasmineCore.describe('decr', function () {
          jasmineCore.it('With integer attribute', function () {
            editor.set('myint', 1);
            editor.decr('myint');
            jasmineCore.expect(editor.get('myint')).toBe(0);
          });
          jasmineCore.it('With non-integer attribute', function () {
            editor.set('foo', 'abc');
            jasmineCore.expect(() => editor.decr('foo')).toThrow();
            jasmineCore.expect(console.assert).toHaveBeenCalled();
            jasmineCore.expect(console.assert.calls.mostRecent().args[0]).toBe(false);
            jasmineCore.expect(editor.get('foo')).toBe('abc');
          });
          jasmineCore.describe('editCount', function () {
            jasmineCore.it('When > 0', function () {
              editor.set('editCount', 1);
              editor.decr('editCount');
              jasmineCore.expect(editor.get('editCount')).toBe(0);
              jasmineCore.expect(editor.validationError).toBe(null);
            });
            jasmineCore.it('When 0', function () {
              editor.set('editCount', 0);
              editor.decr('editCount');
              jasmineCore.expect(editor.get('editCount')).toBe(0);
              jasmineCore.expect(editor.validationError).toBe(RB.ReviewRequestEditor.strings.UNBALANCED_EDIT_COUNT);
            });
          });
        });
        jasmineCore.describe('incr', function () {
          jasmineCore.it('With integer attribute', function () {
            editor.set('myint', 0);
            editor.incr('myint');
            jasmineCore.expect(editor.get('myint')).toBe(1);
          });
          jasmineCore.it('With non-integer attribute', function () {
            editor.set('foo', 'abc');
            jasmineCore.expect(() => editor.incr('foo')).toThrow();
            jasmineCore.expect(console.assert).toHaveBeenCalled();
            jasmineCore.expect(console.assert.calls.mostRecent().args[0]).toBe(false);
            jasmineCore.expect(editor.get('foo')).toBe('abc');
          });
        });
        jasmineCore.describe('getDraftField', function () {
          jasmineCore.it('For closeDescription', function () {
            reviewRequest.set('closeDescription', 'Test');
            const value = editor.getDraftField('closeDescription');
            jasmineCore.expect(value).toBe('Test');
          });
          jasmineCore.it('For closeDescriptionRichText', function () {
            reviewRequest.set('closeDescriptionRichText', true);
            const value = editor.getDraftField('closeDescriptionRichText');
            jasmineCore.expect(value).toBe(true);
          });
          jasmineCore.it('For draft fields', function () {
            reviewRequest.draft.set('description', 'Test');
            const value = editor.getDraftField('description');
            jasmineCore.expect(value).toBe('Test');
          });
          jasmineCore.it('With useExtraData', function () {
            const extraData = reviewRequest.draft.get('extraData');
            extraData.foo = '**Test**';
            const value = editor.getDraftField('foo', {
              useExtraData: true
            });
            jasmineCore.expect(value).toBe('**Test**');
          });
          jasmineCore.describe('With useExtraData and useRawTextValue', function () {
            jasmineCore.it('With field in rawTextFields', function () {
              const draft = reviewRequest.draft;
              const extraData = reviewRequest.draft.get('extraData');
              extraData.foo = '<b>Test</b>';
              draft.set('rawTextFields', {
                extra_data: {
                  foo: '**Test**'
                }
              });
              const value = editor.getDraftField('foo', {
                useExtraData: true,
                useRawTextValue: true
              });
              jasmineCore.expect(value).toBe('**Test**');
            });
            jasmineCore.it('With field not in rawTextFields', function () {
              const extraData = reviewRequest.draft.get('extraData');
              extraData.foo = '<b>Test</b>';
              const value = editor.getDraftField('foo', {
                useExtraData: true,
                useRawTextValue: true
              });
              jasmineCore.expect(value).toBe('<b>Test</b>');
            });
          });
        });
        jasmineCore.describe('setDraftField', function () {
          let draft;
          jasmineCore.beforeEach(function () {
            draft = editor.get('reviewRequest').draft;
          });
          jasmineCore.describe('Rich text fields', function () {
            jasmineCore.describe('changeDescription', function () {
              jasmineCore.describe('Draft description', function () {
                async function testDraftDescription(richText, textType) {
                  jasmineCore.spyOn(reviewRequest, 'close');
                  jasmineCore.spyOn(reviewRequest.draft, 'save').and.resolveTo();
                  await editor.setDraftField('changeDescription', 'My description', {
                    allowMarkdown: true,
                    fieldID: 'changedescription',
                    jsonFieldName: 'changedescription',
                    jsonTextTypeFieldName: 'changedescription_text_type',
                    richText: richText
                  });
                  jasmineCore.expect(reviewRequest.close).not.toHaveBeenCalled();
                  jasmineCore.expect(reviewRequest.draft.save).toHaveBeenCalled();
                  jasmineCore.expect(reviewRequest.draft.save.calls.argsFor(0)[0].data).toEqual({
                    changedescription: 'My description',
                    changedescription_text_type: textType,
                    force_text_type: 'html',
                    include_text_types: 'raw'
                  });
                }
                jasmineCore.it('For Markdown', async function () {
                  await testDraftDescription(true, 'markdown');
                });
                jasmineCore.it('For plain text', async function () {
                  await testDraftDescription(false, 'plain');
                });
              });
            });
          });
          jasmineCore.describe('Special list fields', function () {
            jasmineCore.describe('targetGroups', function () {
              jasmineCore.it('Empty', async function () {
                jasmineCore.spyOn(draft, 'save').and.resolveTo();
                await editor.setDraftField('targetGroups', '', {
                  jsonFieldName: 'target_groups'
                });
                jasmineCore.expect(draft.save).toHaveBeenCalled();
              });
              jasmineCore.it('With values', async function () {
                jasmineCore.spyOn(draft, 'save').and.resolveTo();
                await editor.setDraftField('targetGroups', 'group1, group2', {
                  jsonFieldName: 'target_groups'
                });
                jasmineCore.expect(draft.save).toHaveBeenCalled();
              });
              jasmineCore.it('With invalid groups', async function () {
                jasmineCore.spyOn(draft, 'save').and.rejectWith(new BackboneError(draft, {
                  errorPayload: {
                    fields: {
                      target_groups: ['group1', 'group2']
                    }
                  }
                }, {}));
                await jasmineCore.expectAsync(editor.setDraftField('targetGroups', 'group1, group2', {
                  jsonFieldName: 'target_groups'
                })).toBeRejectedWith(Error('Groups "group1" and "group2" do not exist.'));
              });
            });
            jasmineCore.describe('targetPeople', function () {
              jasmineCore.it('Empty', async function () {
                jasmineCore.spyOn(draft, 'save').and.resolveTo();
                await editor.setDraftField('targetPeople', '', {
                  jsonFieldName: 'target_people'
                });
                jasmineCore.expect(draft.save).toHaveBeenCalled();
              });
              jasmineCore.it('With values', async function () {
                jasmineCore.spyOn(draft, 'save').and.resolveTo();
                await editor.setDraftField('targetPeople', 'user1, user2', {
                  jsonFieldName: 'target_people'
                });
                jasmineCore.expect(draft.save).toHaveBeenCalled();
              });
              jasmineCore.it('With invalid users', async function () {
                jasmineCore.spyOn(draft, 'save').and.rejectWith(new BackboneError(draft, {
                  errorPayload: {
                    fields: {
                      target_people: ['user1', 'user2']
                    }
                  }
                }, {}));
                await jasmineCore.expectAsync(editor.setDraftField('targetPeople', 'user1, user2', {
                  jsonFieldName: 'target_people'
                })).toBeRejectedWith(Error('Users "user1" and "user2" do not exist.'));
              });
            });
            jasmineCore.describe('submitter', function () {
              jasmineCore.it('Empty', async function () {
                jasmineCore.spyOn(draft, 'save').and.resolveTo();
                await editor.setDraftField('submitter', '', {
                  jsonFieldName: 'submitter'
                });
                jasmineCore.expect(draft.save).toHaveBeenCalled();
              });
              jasmineCore.it('With value', async function () {
                jasmineCore.spyOn(draft, 'save').and.resolveTo();
                await editor.setDraftField('submitter', 'user1', {
                  jsonFieldName: 'submitter'
                });
                jasmineCore.expect(draft.save).toHaveBeenCalled();
              });
              jasmineCore.it('With invalid user', async function () {
                jasmineCore.spyOn(draft, 'save').and.rejectWith(new BackboneError(draft, {
                  errorPayload: {
                    fields: {
                      submitter: ['user1']
                    }
                  }
                }, {}));
                await jasmineCore.expectAsync(editor.setDraftField('submitter', 'user1', {
                  jsonFieldName: 'submitter'
                })).toBeRejectedWith(Error('User "user1" does not exist.'));
              });
            });
          });
          jasmineCore.describe('Custom fields', function () {
            jasmineCore.describe('Rich text fields', function () {
              async function testFields(richText, textType) {
                jasmineCore.spyOn(reviewRequest.draft, 'save').and.resolveTo();
                await editor.setDraftField('myField', 'Test text.', {
                  allowMarkdown: true,
                  fieldID: 'myfield',
                  jsonFieldName: 'myfield',
                  jsonTextTypeFieldName: 'myfield_text_type',
                  richText: richText,
                  useExtraData: true
                });
                jasmineCore.expect(reviewRequest.draft.save).toHaveBeenCalled();
                jasmineCore.expect(reviewRequest.draft.save.calls.argsFor(0)[0].data).toEqual({
                  'extra_data.myfield': 'Test text.',
                  'extra_data.myfield_text_type': textType,
                  'force_text_type': 'html',
                  'include_text_types': 'raw'
                });
              }
              jasmineCore.it('For Markdown', async function () {
                await testFields(true, 'markdown');
              });
              jasmineCore.it('For plain text', async function () {
                await testFields(false, 'plain');
              });
            });
          });
        });
      });
      jasmineCore.describe('Reviewed objects', function () {
        jasmineCore.describe('File attachments', function () {
          jasmineCore.it('Removed when destroyed', async function () {
            const fileAttachments = editor.get('fileAttachments');
            const fileAttachment = editor.createFileAttachment();
            const draft = editor.get('reviewRequest').draft;
            jasmineCore.spyOn(draft, 'ensureCreated').and.resolveTo();
            jasmineCore.expect(fileAttachments.at(0)).toBe(fileAttachment);
            await fileAttachment.destroy();
            jasmineCore.expect(fileAttachments.length).toBe(0);
          });
        });
        jasmineCore.describe('Screenshots', function () {
          jasmineCore.it('Removed when destroyed', async function () {
            const screenshots = editor.get('screenshots');
            const screenshot = reviewRequest.createScreenshot();
            screenshots.add(screenshot);
            jasmineCore.expect(screenshots.at(0)).toBe(screenshot);
            await screenshot.destroy();
            jasmineCore.expect(screenshots.length).toBe(0);
          });
        });
      });
      jasmineCore.describe('Events', function () {
        jasmineCore.describe('saved', function () {
          jasmineCore.it('When new file attachment saved', function () {
            const fileAttachment = editor.createFileAttachment();
            jasmineCore.spyOn(editor, 'trigger');
            fileAttachment.trigger('saved');
            jasmineCore.expect(editor.trigger).toHaveBeenCalledWith('saved');
          });
          jasmineCore.it('When new file attachment destroyed', async function () {
            const fileAttachment = editor.createFileAttachment();
            const draft = editor.get('reviewRequest').draft;
            jasmineCore.spyOn(draft, 'ensureCreated').and.resolveTo();
            jasmineCore.spyOn(editor, 'trigger');
            await fileAttachment.destroy();
            jasmineCore.expect(editor.trigger).toHaveBeenCalledWith('saved');
          });
          jasmineCore.it('When existing file attachment saved', function () {
            const fileAttachment = reviewRequest.draft.createFileAttachment();
            editor = new RB.ReviewRequestEditor({
              fileAttachments: new Backbone.Collection([fileAttachment]),
              reviewRequest: reviewRequest
            });
            jasmineCore.spyOn(editor, 'trigger');
            fileAttachment.trigger('saved');
            jasmineCore.expect(editor.trigger).toHaveBeenCalledWith('saved');
          });
          jasmineCore.it('When existing file attachment destroyed', async function () {
            const fileAttachment = reviewRequest.draft.createFileAttachment();
            editor = new RB.ReviewRequestEditor({
              fileAttachments: new Backbone.Collection([fileAttachment]),
              reviewRequest: reviewRequest
            });
            jasmineCore.spyOn(reviewRequest.draft, 'ensureCreated').and.resolveTo();
            jasmineCore.spyOn(editor, 'trigger');
            await fileAttachment.destroy();
            jasmineCore.expect(editor.trigger).toHaveBeenCalledWith('saved');
          });
          jasmineCore.it('When existing screenshot saved', function () {
            const screenshot = reviewRequest.createScreenshot();
            editor = new RB.ReviewRequestEditor({
              reviewRequest: reviewRequest,
              screenshots: new Backbone.Collection([screenshot])
            });
            jasmineCore.spyOn(editor, 'trigger');
            screenshot.trigger('saved');
            jasmineCore.expect(editor.trigger).toHaveBeenCalledWith('saved');
          });
          jasmineCore.it('When existing screenshot destroyed', async function () {
            const screenshot = reviewRequest.createScreenshot();
            editor = new RB.ReviewRequestEditor({
              reviewRequest: reviewRequest,
              screenshots: new Backbone.Collection([screenshot])
            });
            jasmineCore.spyOn(reviewRequest.draft, 'ensureCreated').and.resolveTo();
            jasmineCore.spyOn(editor, 'trigger');
            await screenshot.destroy();
            jasmineCore.expect(editor.trigger).toHaveBeenCalledWith('saved');
          });
        });
        jasmineCore.describe('saving', function () {
          jasmineCore.it('When new file attachment saving', function () {
            const fileAttachment = editor.createFileAttachment();
            jasmineCore.spyOn(editor, 'trigger');
            fileAttachment.trigger('saving');
            jasmineCore.expect(editor.trigger).toHaveBeenCalledWith('saving');
          });
          jasmineCore.it('When existing file attachment saving', function () {
            const fileAttachment = reviewRequest.draft.createFileAttachment();
            editor = new RB.ReviewRequestEditor({
              fileAttachments: new Backbone.Collection([fileAttachment]),
              reviewRequest: reviewRequest
            });
            jasmineCore.spyOn(editor, 'trigger');
            fileAttachment.trigger('saving');
            jasmineCore.expect(editor.trigger).toHaveBeenCalledWith('saving');
          });
          jasmineCore.it('When screenshot saving', function () {
            const screenshot = reviewRequest.createScreenshot();
            editor = new RB.ReviewRequestEditor({
              reviewRequest: reviewRequest,
              screenshots: new Backbone.Collection([screenshot])
            });
            jasmineCore.spyOn(editor, 'trigger');
            screenshot.trigger('saving');
            jasmineCore.expect(editor.trigger).toHaveBeenCalledWith('saving');
          });
        });
      });
    });

    jasmineSuites.suite('rb/pages/models/ReviewablePage', function () {
      jasmineCore.describe('Construction', function () {
        jasmineCore.it('Child objects created', function () {
          const reviewRequest = new RB.ReviewRequest();
          const page = new RB.ReviewablePage({
            editorData: {
              hasDraft: true,
              showSendEmail: false
            },
            pendingReview: new RB.Review(),
            reviewRequest: reviewRequest
          });
          jasmineCore.expect(page.commentIssueManager).toBeTruthy();
          jasmineCore.expect(page.commentIssueManager.get('reviewRequest')).toBe(reviewRequest);
          jasmineCore.expect(page.reviewRequestEditor.get('commentIssueManager')).toBe(page.commentIssueManager);
          jasmineCore.expect(page.reviewRequestEditor.get('reviewRequest')).toBe(reviewRequest);
          jasmineCore.expect(page.reviewRequestEditor.get('showSendEmail')).toBe(false);
          jasmineCore.expect(page.reviewRequestEditor.get('hasDraft')).toBe(true);
        });
      });
      jasmineCore.describe('parse', function () {
        jasmineCore.it('{}', function () {
          const page = new RB.ReviewablePage({}, {
            parse: true
          });
          jasmineCore.expect(page.get('reviewRequest')).toBeTruthy();
          jasmineCore.expect(page.get('pendingReview')).toBeTruthy();
          jasmineCore.expect(page.get('lastActivityTimestamp')).toBe(null);
          jasmineCore.expect(page.get('checkForUpdates')).toBe(false);
          jasmineCore.expect(page.get('checkUpdatesType')).toBe(null);

          /* These shouldn't be attributes. */
          jasmineCore.expect(page.get('editorData')).toBe(undefined);
          jasmineCore.expect(page.get('reviewRequestData')).toBe(undefined);
        });
        jasmineCore.it('reviewRequestData', function () {
          const page = new RB.ReviewablePage({
            reviewRequestData: {
              branch: 'my-branch',
              bugTrackerURL: 'http://bugs.example.com/--bug_id--/',
              bugsClosed: [101, 102, 103],
              closeDescription: 'This is closed',
              closeDescriptionRichText: true,
              description: 'This is a description',
              descriptionRichText: true,
              hasDraft: true,
              id: 123,
              lastUpdatedTimestamp: '2017-08-23T15:10:20Z',
              localSitePrefix: 's/foo/',
              public: true,
              repository: {
                id: 200,
                name: 'My repo',
                requiresBasedir: true,
                requiresChangeNumber: true,
                scmtoolName: 'My Tool',
                supportsPostCommit: true
              },
              reviewURL: '/s/foo/r/123/',
              state: 'CLOSE_SUBMITTED',
              summary: 'This is a summary',
              targetGroups: [{
                name: 'Some group',
                url: '/s/foo/groups/some-group/'
              }],
              targetPeople: [{
                url: '/s/foo/users/some-user/',
                username: 'some-user'
              }],
              testingDone: 'This is testing done',
              testingDoneRichText: true,
              visibility: 'ARCHIVED'
            }
          }, {
            parse: true
          });
          jasmineCore.expect(page.get('pendingReview')).toBeTruthy();
          jasmineCore.expect(page.get('checkForUpdates')).toBe(false);
          jasmineCore.expect(page.get('reviewRequestData')).toBe(undefined);

          /* Check the review request. */
          const reviewRequest = page.get('reviewRequest');
          jasmineCore.expect(reviewRequest).toBeTruthy();
          jasmineCore.expect(reviewRequest.id).toBe(123);
          jasmineCore.expect(reviewRequest.url()).toBe('/s/foo/api/review-requests/123/');
          jasmineCore.expect(reviewRequest.get('bugTrackerURL')).toBe('http://bugs.example.com/--bug_id--/');
          jasmineCore.expect(reviewRequest.get('localSitePrefix')).toBe('s/foo/');
          jasmineCore.expect(reviewRequest.get('branch')).toBe('my-branch');
          jasmineCore.expect(reviewRequest.get('bugsClosed')).toEqual([101, 102, 103]);
          jasmineCore.expect(reviewRequest.get('closeDescription')).toBe('This is closed');
          jasmineCore.expect(reviewRequest.get('closeDescriptionRichText')).toBe(true);
          jasmineCore.expect(reviewRequest.get('description')).toBe('This is a description');
          jasmineCore.expect(reviewRequest.get('descriptionRichText')).toBe(true);
          jasmineCore.expect(reviewRequest.get('hasDraft')).toBe(true);
          jasmineCore.expect(reviewRequest.get('lastUpdatedTimestamp')).toBe('2017-08-23T15:10:20Z');
          jasmineCore.expect(reviewRequest.get('public')).toBe(true);
          jasmineCore.expect(reviewRequest.get('reviewURL')).toBe('/s/foo/r/123/');
          jasmineCore.expect(reviewRequest.get('state')).toBe(RB.ReviewRequest.CLOSE_SUBMITTED);
          jasmineCore.expect(reviewRequest.get('summary')).toBe('This is a summary');
          jasmineCore.expect(reviewRequest.get('targetGroups')).toEqual([{
            name: 'Some group',
            url: '/s/foo/groups/some-group/'
          }]);
          jasmineCore.expect(reviewRequest.get('targetPeople')).toEqual([{
            url: '/s/foo/users/some-user/',
            username: 'some-user'
          }]);
          jasmineCore.expect(reviewRequest.get('testingDone')).toBe('This is testing done');
          jasmineCore.expect(reviewRequest.get('testingDoneRichText')).toBe(true);
          jasmineCore.expect(reviewRequest.get('visibility')).toBe(RB.ReviewRequest.VISIBILITY_ARCHIVED);

          /* Check the review request's repository. */
          const repository = reviewRequest.get('repository');
          jasmineCore.expect(repository.id).toBe(200);
          jasmineCore.expect(repository.get('name')).toBe('My repo');
          jasmineCore.expect(repository.get('requiresBasedir')).toBe(true);
          jasmineCore.expect(repository.get('requiresChangeNumber')).toBe(true);
          jasmineCore.expect(repository.get('scmtoolName')).toBe('My Tool');
          jasmineCore.expect(repository.get('supportsPostCommit')).toBe(true);
        });
        jasmineCore.it('extraReviewRequestDraftData', function () {
          const page = new RB.ReviewablePage({
            extraReviewRequestDraftData: {
              changeDescription: 'Draft change description',
              changeDescriptionRichText: true,
              interdiffLink: '/s/foo/r/123/diff/1-2/'
            }
          }, {
            parse: true
          });
          jasmineCore.expect(page.get('pendingReview')).toBeTruthy();
          jasmineCore.expect(page.get('checkForUpdates')).toBe(false);
          jasmineCore.expect(page.get('reviewRequestData')).toBe(undefined);
          const draft = page.get('reviewRequest').draft;
          jasmineCore.expect(draft.get('changeDescription')).toBe('Draft change description');
          jasmineCore.expect(draft.get('changeDescriptionRichText')).toBe(true);
          jasmineCore.expect(draft.get('interdiffLink')).toBe('/s/foo/r/123/diff/1-2/');
        });
        jasmineCore.it('editorData', function () {
          const page = new RB.ReviewablePage({
            editorData: {
              changeDescriptionRenderedText: 'Change description',
              closeDescriptionRenderedText: 'This is closed',
              hasDraft: true,
              mutableByUser: true,
              showSendEmail: true,
              statusMutableByUser: true
            }
          }, {
            parse: true
          });
          jasmineCore.expect(page.get('pendingReview')).toBeTruthy();
          jasmineCore.expect(page.get('checkForUpdates')).toBe(false);
          jasmineCore.expect(page.get('editorData')).toBe(undefined);

          /* Check the ReviewRequestEditor. */
          const editor = page.reviewRequestEditor;
          jasmineCore.expect(editor.get('changeDescriptionRenderedText')).toBe('Change description');
          jasmineCore.expect(editor.get('closeDescriptionRenderedText')).toBe('This is closed');
          jasmineCore.expect(editor.get('hasDraft')).toBe(true);
          jasmineCore.expect(editor.get('mutableByUser')).toBe(true);
          jasmineCore.expect(editor.get('showSendEmail')).toBe(true);
          jasmineCore.expect(editor.get('statusMutableByUser')).toBe(true);
        });
        jasmineCore.it('lastActivityTimestamp', function () {
          const page = new RB.ReviewablePage({
            lastActivityTimestamp: '2017-08-22T18:20:30Z',
            checkUpdatesType: 'diff'
          }, {
            parse: true
          });
          jasmineCore.expect(page.get('lastActivityTimestamp')).toBe('2017-08-22T18:20:30Z');
        });
        jasmineCore.it('checkUpdatesType', function () {
          const page = new RB.ReviewablePage({
            checkUpdatesType: 'diff'
          }, {
            parse: true
          });
          jasmineCore.expect(page.get('pendingReview')).toBeTruthy();
          jasmineCore.expect(page.get('checkUpdatesType')).toBe('diff');
        });
      });
      jasmineCore.describe('Actions', function () {
        jasmineCore.it('markShipIt', async function () {
          const page = new RB.ReviewablePage({}, {
            parse: true
          });
          const pendingReview = page.get('pendingReview');
          jasmineCore.spyOn(pendingReview, 'ready').and.resolveTo();
          jasmineCore.spyOn(pendingReview, 'publish');
          await page.markShipIt();
          jasmineCore.expect(pendingReview.publish).toHaveBeenCalled();
          jasmineCore.expect(pendingReview.get('shipIt')).toBe(true);
          jasmineCore.expect(pendingReview.get('bodyTop')).toBe('Ship It!');
        });
      });
    });

    jasmineSuites.suite('rb/views/CommentDialogView', function () {
      let reviewRequest;
      let reviewRequestEditor;
      jasmineCore.beforeEach(function () {
        RB.DnDUploader.create();
        reviewRequest = new RB.ReviewRequest();
        reviewRequestEditor = new RB.ReviewRequestEditor({
          reviewRequest: reviewRequest
        });
      });
      jasmineCore.afterEach(function () {
        RB.DnDUploader.instance = null;
      });
      jasmineCore.describe('Class methods', function () {
        jasmineCore.describe('create', function () {
          jasmineCore.it('Without a comment', function () {
            jasmineCore.expect(() => RB.CommentDialogView.create({
              animate: false,
              comment: undefined,
              container: $testsScratch,
              reviewRequestEditor: reviewRequestEditor
            })).toThrow();
            jasmineCore.expect(RB.CommentDialogView._instance).toBeFalsy();
            jasmineCore.expect($testsScratch.children().length).toBe(0);
          });
          jasmineCore.it('With a comment', function () {
            const dlg = RB.CommentDialogView.create({
              animate: false,
              comment: new RB.DiffComment(),
              container: $testsScratch,
              reviewRequestEditor: reviewRequestEditor
            });
            jasmineCore.expect(dlg).toBeTruthy();
            jasmineCore.expect(RB.CommentDialogView._instance).toBe(dlg);
            jasmineCore.expect($testsScratch.children().length).toBe(1);
          });
          jasmineCore.it('Replacing an open dialog', function () {
            const dlg1 = RB.CommentDialogView.create({
              animate: false,
              comment: new RB.DiffComment(),
              container: $testsScratch,
              reviewRequestEditor: reviewRequestEditor
            });
            jasmineCore.expect(dlg1).toBeTruthy();
            const dlg2 = RB.CommentDialogView.create({
              animate: false,
              comment: new RB.DiffComment(),
              container: $testsScratch,
              reviewRequestEditor: reviewRequestEditor
            });
            jasmineCore.expect(dlg2).toBeTruthy();
            jasmineCore.expect(dlg2).not.toBe(dlg1);
            jasmineCore.expect(dlg1.$el.parents().length).toBe(0);
            jasmineCore.expect(RB.CommentDialogView._instance).toBe(dlg2);
            jasmineCore.expect($testsScratch.children().length).toBe(1);
          });
        });
      });
      jasmineCore.describe('Instances', function () {
        let editor;
        let dlg;
        jasmineCore.beforeEach(function () {
          editor = new RB.CommentEditor({
            canEdit: true,
            comment: new RB.DiffComment(),
            publishedCommentsType: 'diff_comments',
            reviewRequest: reviewRequest,
            reviewRequestEditor: reviewRequestEditor
          });
          dlg = new RB.CommentDialogView({
            animate: false,
            commentIssueManager: new RB.CommentIssueManager(),
            model: editor
          });
          dlg.on('closed', () => {
            dlg = null;
          });
          dlg.render().$el.appendTo($testsScratch);
        });
        jasmineCore.afterEach(function () {
          if (dlg) {
            dlg.close();
          }
        });
        jasmineCore.describe('Buttons', function () {
          jasmineCore.beforeEach(function () {
            dlg.open();
          });
          jasmineCore.describe('Cancel', function () {
            let $button;
            jasmineCore.beforeEach(function () {
              $button = dlg.$el.find('.btn-cancel');
            });
            jasmineCore.it('Enabled', function () {
              jasmineCore.expect($button.is(':disabled')).toBe(false);
            });
            jasmineCore.it('Cancels editor when clicked', function () {
              jasmineCore.spyOn(editor, 'cancel');
              $button.click();
              jasmineCore.expect(editor.cancel).toHaveBeenCalled();
            });
            jasmineCore.it('Closes dialog when clicked', function () {
              jasmineCore.spyOn(editor, 'cancel');
              jasmineCore.spyOn(dlg, 'close');
              $button.click();
              jasmineCore.expect(dlg.close).toHaveBeenCalled();
            });
            jasmineCore.it('Confirms before cancelling unsaved comment', function () {
              jasmineCore.spyOn(editor, 'cancel');
              jasmineCore.spyOn(dlg, 'close');
              jasmineCore.spyOn(window, 'confirm').and.returnValue(true);
              editor.set('dirty', true);
              $button.click();
              jasmineCore.expect(dlg.close).toHaveBeenCalled();
            });
            jasmineCore.it('Cancel close when unsaved comment', function () {
              jasmineCore.spyOn(editor, 'cancel');
              jasmineCore.spyOn(dlg, 'close');
              jasmineCore.spyOn(window, 'confirm').and.returnValue(false);
              editor.set('dirty', true);
              $button.click();
              jasmineCore.expect(dlg.close).not.toHaveBeenCalled();
            });
            jasmineCore.describe('Visibility', function () {
              jasmineCore.it('Shown when canEdit=true', function () {
                editor.set('canEdit', true);
                jasmineCore.expect($button.is(':visible')).toBe(true);
              });
              jasmineCore.it('Hidden when canEdit=false', function () {
                editor.set('canEdit', false);
                jasmineCore.expect($button.is(':visible')).toBe(false);
              });
            });
          });
          jasmineCore.describe('Close', function () {
            let $button;
            jasmineCore.beforeEach(function () {
              $button = dlg.$el.find('.btn-close');
            });
            jasmineCore.it('Cancels editor when clicked', function () {
              jasmineCore.spyOn(editor, 'cancel');
              $button.click();
              jasmineCore.expect(editor.cancel).toHaveBeenCalled();
            });
            jasmineCore.it('Closes dialog when clicked', function () {
              jasmineCore.spyOn(editor, 'cancel');
              jasmineCore.spyOn(dlg, 'close');
              $button.click();
              jasmineCore.expect(dlg.close).toHaveBeenCalled();
            });
            jasmineCore.describe('Visibility', function () {
              jasmineCore.it('Shown when canEdit=false', function () {
                editor.set('canEdit', false);
                jasmineCore.expect($button.is(':visible')).toBe(true);
              });
              jasmineCore.it('Hidden when canEdit=true', function () {
                editor.set('canEdit', true);
                jasmineCore.expect($button.is(':visible')).toBe(false);
              });
            });
          });
          jasmineCore.describe('Delete', function () {
            let $button;
            jasmineCore.beforeEach(function () {
              $button = dlg.$el.find('.btn-delete');
            });
            jasmineCore.it('Cancels editor when clicked', function () {
              editor.set('canDelete', true);
              jasmineCore.spyOn(editor, 'deleteComment');
              $button.click();
              jasmineCore.expect(editor.deleteComment).toHaveBeenCalled();
            });
            jasmineCore.it('Closes dialog when clicked', function () {
              editor.set('canDelete', true);
              jasmineCore.spyOn(editor, 'deleteComment');
              jasmineCore.spyOn(dlg, 'close');
              $button.click();
              jasmineCore.expect(dlg.close).toHaveBeenCalled();
            });
            jasmineCore.describe('Enabled state', function () {
              jasmineCore.it('Enabled when editor.canDelete=true', function () {
                editor.set('canDelete', true);
                jasmineCore.expect($button.is(':disabled')).toBe(false);
              });
              jasmineCore.it('Disabled when editor.canDelete=false', function () {
                editor.set('canDelete', false);
                jasmineCore.expect($button.is(':disabled')).toBe(true);
              });
            });
            jasmineCore.describe('Visibility', function () {
              jasmineCore.it('Shown when canDelete=true', function () {
                editor.set('canDelete', true);
                jasmineCore.expect($button.is(':visible')).toBe(true);
              });
              jasmineCore.it('Hidden when caDelete=false', function () {
                editor.set('canDelete', false);
                jasmineCore.expect($button.is(':visible')).toBe(false);
              });
            });
          });
          jasmineCore.describe('Save', function () {
            let $button;
            jasmineCore.beforeEach(function () {
              $button = dlg.$el.find('.btn-save');
            });
            jasmineCore.it('Cancels editor when clicked', function () {
              editor.set('canSave', true);
              jasmineCore.spyOn(editor, 'save').and.resolveTo();
              $button.click();
              jasmineCore.expect(editor.save).toHaveBeenCalled();
            });
            jasmineCore.it('Closes dialog when clicked', function () {
              editor.set('canSave', true);
              jasmineCore.spyOn(editor, 'save').and.resolveTo();
              jasmineCore.spyOn(dlg, 'close');
              $button.click();
              jasmineCore.expect(dlg.close).toHaveBeenCalled();
            });
            jasmineCore.describe('Enabled state', function () {
              jasmineCore.it('Enabled when editor.canSave=true', function () {
                editor.set('canSave', true);
                jasmineCore.expect($button.is(':disabled')).toBe(false);
              });
              jasmineCore.it('Disabled when editor.canSave=false', function () {
                editor.set('canSave', false);
                jasmineCore.expect($button.is(':disabled')).toBe(true);
              });
            });
            jasmineCore.describe('Visibility', function () {
              jasmineCore.it('Shown when canEdit=true', function () {
                editor.set('canEdit', true);
                jasmineCore.expect($button.is(':visible')).toBe(true);
              });
              jasmineCore.it('Hidden when canEdit=false', function () {
                editor.set('canEdit', false);
                jasmineCore.expect($button.is(':visible')).toBe(false);
              });
            });
          });
        });
        jasmineCore.describe('Fields', function () {
          jasmineCore.beforeEach(function () {
            dlg.open();
          });
          jasmineCore.describe('Open an Issue checkbox', function () {
            jasmineCore.describe('Visibility', function () {
              jasmineCore.it('Shown when canEdit=true', function () {
                editor.set('canEdit', true);
                jasmineCore.expect(dlg._$issueOptions.is(':visible')).toBe(true);
              });
              jasmineCore.it('Hidden when canEdit=false', function () {
                editor.set('canEdit', false);
                jasmineCore.expect(dlg._$issueOptions.is(':visible')).toBe(false);
              });
            });
          });
          jasmineCore.describe('Textbox', function () {
            jasmineCore.describe('Visibility', function () {
              jasmineCore.it('Shown when canEdit=true', function () {
                editor.set('canEdit', true);
                jasmineCore.expect(dlg._textEditor.$el.is(':visible')).toBe(true);
              });
              jasmineCore.it('Hidden when canEdit=false', function () {
                editor.set('canEdit', false);
                jasmineCore.expect(dlg._textEditor.$el.is(':visible')).toBe(false);
              });
            });
          });
        });
        jasmineCore.describe('Height', function () {
          jasmineCore.beforeEach(function () {
            editor = new RB.CommentEditor({
              comment: new RB.DiffComment(),
              reviewRequest: reviewRequest,
              reviewRequestEditor: reviewRequestEditor
            });
            dlg = new RB.CommentDialogView({
              animate: false,
              model: editor
            });
          });
          jasmineCore.it('When canEdit=true', function () {
            editor.set('canEdit', true);
            dlg.render();
            dlg.open();
            jasmineCore.expect(dlg.$el.height()).toBe(RB.CommentDialogView.DIALOG_TOTAL_HEIGHT);
          });
          jasmineCore.it('When canEdit=false', function () {
            editor.set('canEdit', false);
            dlg.render();
            dlg.open();
            jasmineCore.expect(dlg.$el.height()).toBe(RB.CommentDialogView.DIALOG_NON_EDITABLE_HEIGHT);
          });
        });
        jasmineCore.describe('Other published comments list', function () {
          let $commentsList;
          let $commentsPane;
          jasmineCore.beforeEach(function () {
            $commentsPane = dlg.$el.find('.other-comments');
            $commentsList = $commentsPane.children('ul');
            jasmineCore.expect($commentsList.length).toBe(1);
          });
          jasmineCore.describe('Empty list', function () {
            jasmineCore.it('Hidden pane', function () {
              jasmineCore.expect($commentsPane.is(':visible')).toBe(false);
            });
          });
          jasmineCore.describe('Populated list', function () {
            let comment;
            let commentReply;
            let parentCommentReplyLink;
            jasmineCore.beforeEach(function () {
              comment = new RB.DiffComment();
              comment.user = {
                'name': 'Test User'
              };
              comment.url = 'http://example.com/';
              comment.comment_id = 1;
              comment.text = 'Sample comment.';
              comment.issue_opened = false;
              parentCommentReplyLink = `/?reply_id=${comment.comment_id}`;
              commentReply = new RB.DiffComment();
              commentReply.user = {
                'name': 'Test User'
              };
              commentReply.url = 'http://example.com/';
              commentReply.comment_id = 2;
              commentReply.text = 'Sample comment.';
              commentReply.issue_opened = false;
              commentReply.reply_to_id = 1;
            });
            jasmineCore.describe('Visible pane', function () {
              jasmineCore.it('Setting list before opening dialog', function () {
                editor.set('publishedComments', [comment]);
                dlg.open();
                jasmineCore.expect($commentsPane.is(':visible')).toBe(true);
              });
              jasmineCore.it('Setting list after opening dialog', function () {
                dlg.open();
                editor.set('publishedComments', [comment]);
                jasmineCore.expect($commentsPane.is(':visible')).toBe(true);
              });
            });
            jasmineCore.it('List items added', function () {
              dlg.open();
              editor.set('publishedComments', [comment]);
              jasmineCore.expect($commentsList.children().length).toBe(1);
            });
            jasmineCore.it('Parent comment reply link links to itself', function () {
              editor.set('publishedComments', [comment]);
              dlg.open();
              const $replyLink = $commentsList.find('.comment-list-reply-action');
              jasmineCore.expect($replyLink[0].href).toContain(parentCommentReplyLink);
            });
            jasmineCore.it('Both parent and reply comment reply links link to ' + 'parent comment', function () {
              editor.set('publishedComments', [comment, commentReply]);
              dlg.open();
              const $replyLinks = $commentsList.find('.comment-list-reply-action');
              jasmineCore.expect($replyLinks.length).toEqual(2);
              jasmineCore.expect($replyLinks[0].href).toContain(parentCommentReplyLink);
              jasmineCore.expect($replyLinks[1].href).toContain(parentCommentReplyLink);
            });
          });
          jasmineCore.describe('Issue bar buttons', function () {
            let comment;
            jasmineCore.beforeEach(function () {
              comment = new RB.DiffComment();
              comment.user = {
                'name': 'Test User'
              };
              comment.url = 'http://example.com/';
              comment.comment_id = 1;
              comment.review_id = 1;
              comment.text = 'Sample comment.';
              comment.issue_opened = true;
              comment.issue_status = 'open';
            });
            jasmineCore.it('When interactive', function () {
              reviewRequestEditor.set('editable', true);
              editor.set('publishedComments', [comment]);
              dlg = new RB.CommentDialogView({
                animate: false,
                commentIssueManager: new RB.CommentIssueManager(),
                model: editor
              });
              dlg.render().$el.appendTo($testsScratch);
              dlg.open();
              const $buttons = dlg.$el.find('.rb-c-issue-bar__actions button');
              jasmineCore.expect($buttons.length).toBe(2);
              jasmineCore.expect($buttons.is(':visible')).toBe(true);
            });
            jasmineCore.it('When not interactive', function () {
              reviewRequestEditor.set('editable', false);
              editor.set('publishedComments', [comment]);
              dlg = new RB.CommentDialogView({
                animate: false,
                commentIssueManager: new RB.CommentIssueManager(),
                model: editor
              });
              dlg.render().$el.appendTo($testsScratch);
              dlg.open();
              const $buttons = dlg.$el.find('.rb-c-issue-bar__actions button');
              jasmineCore.expect($buttons.length).toBe(0);
            });
          });
        });
        jasmineCore.describe('Methods', function () {
          jasmineCore.describe('close', function () {
            jasmineCore.it('Editor state', function () {
              dlg.open();
              jasmineCore.expect(editor.get('editing')).toBe(true);
              dlg.close();
              jasmineCore.expect(editor.get('editing')).toBe(false);
            });
            jasmineCore.it('Dialog removed', function () {
              dlg.open();
              jasmineCore.spyOn(dlg, 'trigger');
              dlg.close();
              jasmineCore.expect(dlg.trigger).toHaveBeenCalledWith('closed');
              jasmineCore.expect(dlg.$el.parents().length).toBe(0);
              jasmineCore.expect($testsScratch.children().length).toBe(0);
            });
          });
          jasmineCore.describe('open', function () {
            jasmineCore.it('Editor state', function () {
              jasmineCore.expect(editor.get('editing')).toBe(false);
              dlg.open();
              jasmineCore.expect(editor.get('editing')).toBe(true);
            });
            jasmineCore.it('Visibility', function () {
              jasmineCore.expect(dlg.$el.is(':visible')).toBe(false);
              dlg.open();
              jasmineCore.expect(dlg.$el.is(':visible')).toBe(true);
            });
            jasmineCore.it('Default focus', function () {
              const $textarea = dlg.$el.find('textarea');
              jasmineCore.expect($textarea.is(':focus')).toBe(false);
              jasmineCore.spyOn($textarea[0], 'focus');
              dlg.open();
              jasmineCore.expect($textarea[0].focus).toHaveBeenCalled();
            });
          });
        });
        jasmineCore.describe('Special keys', function () {
          let $textarea;
          function simulateKeyPress(key, altKey, ctrlKey, metaKey) {
            $textarea.focus();
            ['keydown', 'keypress', 'keyup'].forEach(type => {
              const e = $.Event(type);
              e.key = key;
              e.altKey = altKey;
              e.ctrlKey = ctrlKey;
              e.metaKey = metaKey;
              $textarea.trigger(e);
            });
          }
          function setupForRichText(richText, canSave = false) {
            editor.set('richText', richText);
            editor.set('canSave', !!canSave);
            $textarea = dlg.$('textarea');
          }
          jasmineCore.beforeEach(function () {
            dlg.open();
            $textarea = dlg.$('textarea');
          });
          jasmineCore.describe('Control-Enter to save', function () {
            jasmineCore.beforeEach(function () {
              jasmineCore.spyOn(editor, 'save').and.resolveTo();
              jasmineCore.spyOn(dlg, 'close');
            });
            jasmineCore.describe('With editor.canSave=true', function () {
              jasmineCore.it('If Markdown', function () {
                setupForRichText(true, true);
                simulateKeyPress('Enter', false, true);
                jasmineCore.expect(editor.save).toHaveBeenCalled();
                jasmineCore.expect(dlg.close).toHaveBeenCalled();
              });
              jasmineCore.it('If plain text', function () {
                setupForRichText(false, true);
                simulateKeyPress('Enter', false, true);
                jasmineCore.expect(editor.save).toHaveBeenCalled();
                jasmineCore.expect(dlg.close).toHaveBeenCalled();
              });
            });
            jasmineCore.describe('With editor.canSave=false', function () {
              jasmineCore.beforeEach(function () {
                editor.set('canSave', false);
              });
              jasmineCore.it('If Markdown', function () {
                setupForRichText(true);
                simulateKeyPress('Enter', false, true);
                jasmineCore.expect(editor.save).not.toHaveBeenCalled();
                jasmineCore.expect(dlg.close).not.toHaveBeenCalled();
              });
              jasmineCore.it('If plain text', function () {
                setupForRichText(false);
                simulateKeyPress('Enter', false, true);
                jasmineCore.expect(editor.save).not.toHaveBeenCalled();
                jasmineCore.expect(dlg.close).not.toHaveBeenCalled();
              });
            });
          });
          jasmineCore.describe('Command-Enter to save', function () {
            jasmineCore.beforeEach(function () {
              jasmineCore.spyOn(editor, 'save').and.resolveTo();
              jasmineCore.spyOn(dlg, 'close');
            });
            jasmineCore.describe('With editor.canSave=true', function () {
              jasmineCore.it('If Markdown', function () {
                setupForRichText(true, true);
                simulateKeyPress('Enter', false, false, true);
                jasmineCore.expect(editor.save).toHaveBeenCalled();
                jasmineCore.expect(dlg.close).toHaveBeenCalled();
              });
              jasmineCore.it('If plain text', function () {
                setupForRichText(false, true);
                simulateKeyPress('Enter', false, false, true);
                jasmineCore.expect(editor.save).toHaveBeenCalled();
                jasmineCore.expect(dlg.close).toHaveBeenCalled();
              });
            });
            jasmineCore.describe('With editor.canSave=false', function () {
              jasmineCore.beforeEach(function () {
                editor.set('canSave', false);
              });
              jasmineCore.it('If Markdown', function () {
                setupForRichText(true);
                simulateKeyPress('Enter', false, false, true);
                jasmineCore.expect(editor.save).not.toHaveBeenCalled();
                jasmineCore.expect(dlg.close).not.toHaveBeenCalled();
              });
              jasmineCore.it('If plain text', function () {
                setupForRichText(false);
                simulateKeyPress('Enter', false, false, true);
                jasmineCore.expect(editor.save).not.toHaveBeenCalled();
                jasmineCore.expect(dlg.close).not.toHaveBeenCalled();
              });
            });
          });
          jasmineCore.describe('Escape to cancel', function () {
            jasmineCore.describe('Pressing escape in text area', function () {
              jasmineCore.beforeEach(function () {
                jasmineCore.spyOn(editor, 'cancel');
                jasmineCore.spyOn(dlg, 'close');
              });
              jasmineCore.it('If Markdown', function () {
                jasmineCore.spyOn(window, 'confirm').and.returnValue(true);
                setupForRichText(true);
                simulateKeyPress('Escape', false, false);
                jasmineCore.expect(editor.cancel).toHaveBeenCalled();
                jasmineCore.expect(window.confirm).toHaveBeenCalled();
                jasmineCore.expect(dlg.close).toHaveBeenCalled();
              });
              jasmineCore.it('If plain text', function () {
                setupForRichText(false);
                simulateKeyPress('Escape', false, false);
                jasmineCore.expect(editor.cancel).toHaveBeenCalled();
                jasmineCore.expect(dlg.close).toHaveBeenCalled();
              });
              jasmineCore.it('If unsaved comment', function () {
                jasmineCore.spyOn(window, 'confirm').and.returnValue(true);
                editor.set('dirty', true);
                simulateKeyPress('Escape', false, false);
                jasmineCore.expect(editor.cancel).toHaveBeenCalled();
                jasmineCore.expect(window.confirm).toHaveBeenCalled();
                jasmineCore.expect(dlg.close).toHaveBeenCalled();
              });
              jasmineCore.it('If unsaved comment, do not close', function () {
                jasmineCore.spyOn(window, 'confirm').and.returnValue(false);
                editor.set('dirty', true);
                simulateKeyPress('Escape', false, false);
                jasmineCore.expect(editor.cancel).not.toHaveBeenCalled();
                jasmineCore.expect(window.confirm).toHaveBeenCalled();
                jasmineCore.expect(dlg.close).not.toHaveBeenCalled();
              });
            });
          });
          jasmineCore.describe('Toggle open issue', function () {
            let $checkbox;
            function runToggleIssueTest(richText, startState, keyCode) {
              setupForRichText(richText);
              $checkbox.prop('checked', startState);
              editor.set('openIssue', startState);
              simulateKeyPress(keyCode, true, false);
              jasmineCore.expect($checkbox.prop('checked')).toBe(!startState);
              jasmineCore.expect(editor.get('openIssue')).toBe(!startState);
              jasmineCore.expect($textarea.val()).toBe('');
            }
            jasmineCore.beforeEach(function () {
              $checkbox = dlg.$el.find('input[type=checkbox]');
            });
            jasmineCore.describe('Alt-I', function () {
              jasmineCore.describe('Checked to unchecked', function () {
                jasmineCore.it('If Markdown', function () {
                  runToggleIssueTest(true, true, 'i');
                });
                jasmineCore.it('If plain text', function () {
                  runToggleIssueTest(false, true, 'i');
                });
              });
              jasmineCore.describe('Unchecked to checked', function () {
                jasmineCore.it('If Markdown', function () {
                  runToggleIssueTest(true, false, 'i');
                });
                jasmineCore.it('If plain text', function () {
                  runToggleIssueTest(false, false, 'i');
                });
              });
            });
            jasmineCore.describe('Alt-i', function () {
              jasmineCore.describe('Checked to unchecked', function () {
                jasmineCore.it('If Markdown', function () {
                  runToggleIssueTest(true, true, 'i');
                });
                jasmineCore.it('If plain text', function () {
                  runToggleIssueTest(false, true, 'i');
                });
              });
              jasmineCore.describe('Unchecked to checked', function () {
                jasmineCore.it('If Markdown', function () {
                  runToggleIssueTest(true, false, 'i');
                });
                jasmineCore.it('If plain text', function () {
                  runToggleIssueTest(false, false, 'i');
                });
              });
            });
          });
        });
        jasmineCore.describe('Title text', function () {
          let $title;
          jasmineCore.beforeEach(function () {
            dlg.open();
            $title = dlg.$el.find('form .title');
          });
          jasmineCore.it('Default state', function () {
            jasmineCore.expect($title.text()).toBe('Your comment');
          });
          jasmineCore.it('Setting dirty=true', function () {
            editor.set('dirty', true);
            jasmineCore.expect($title.text()).toBe('Your comment (unsaved)');
          });
          jasmineCore.it('Setting dirty=false', function () {
            editor.set('dirty', true);
            editor.set('dirty', false);
            jasmineCore.expect($title.text()).toBe('Your comment');
          });
        });
        jasmineCore.describe('State synchronization', function () {
          jasmineCore.describe('Comment text', function () {
            let $textarea;
            jasmineCore.beforeEach(function () {
              dlg.open();
              $textarea = $(dlg._textEditor.$('textarea'));
            });
            jasmineCore.describe('Dialog to editor', function () {
              const text = 'foo';
              jasmineCore.beforeEach(function (done) {
                $textarea.focus();
                for (let i = 0; i < text.length; i++) {
                  const c = text.charCodeAt(i);
                  let e = $.Event('keydown');
                  e.which = c;
                  $textarea.trigger(e);
                  e = $.Event('keypress');
                  e.which = c;
                  $textarea.trigger(e);
                  dlg._textEditor.setText(dlg._textEditor.getText() + text[i]);
                  e = $.Event('keyup');
                  e.which = c;
                  $textarea.trigger(e);
                }
                const t = setInterval(() => {
                  if (dlg._textEditor.getText() === text) {
                    clearInterval(t);
                    done();
                  }
                }, 100);
              });
              jasmineCore.it('', function () {
                jasmineCore.expect(editor.get('text')).toEqual(text);
              });
            });
            jasmineCore.it('Editor to dialog', function () {
              const text = 'bar';
              editor.set('text', text);
              jasmineCore.expect(dlg._textEditor.getText()).toEqual(text);
            });
          });
          jasmineCore.describe('Open Issue checkbox', function () {
            let $checkbox;
            jasmineCore.beforeEach(function () {
              dlg.open();
              $checkbox = dlg.$('#comment_issue');
              $checkbox.prop('checked', false);
              editor.set('openIssue', false);
            });
            jasmineCore.it('Dialog to editor', function () {
              $checkbox.click();
              jasmineCore.expect(editor.get('openIssue')).toBe(true);
            });
            jasmineCore.it('Editor to dialog', function () {
              editor.set('openIssue', true);
              jasmineCore.expect($checkbox.prop('checked')).toBe(true);
            });
          });
          jasmineCore.describe('Enable Markdown checkbox', function () {
            let $checkbox;
            jasmineCore.beforeEach(function () {
              dlg.open();
              $checkbox = dlg.$('#enable_markdown');
              $checkbox.prop('checked', false);
              editor.set('richText', false);
              jasmineCore.expect(dlg._textEditor.richText).toBe(false);
            });
            jasmineCore.it('Dialog to editor', function () {
              $checkbox.click();
              jasmineCore.expect(editor.get('richText')).toBe(true);
              jasmineCore.expect(dlg._textEditor.richText).toBe(true);
            });
            jasmineCore.it('Editor to dialog', function () {
              editor.set('richText', true);
              jasmineCore.expect($checkbox.prop('checked')).toBe(true);
              jasmineCore.expect(dlg._textEditor.richText).toBe(true);
            });
          });
        });
        jasmineCore.describe('User preference defaults', function () {
          jasmineCore.describe('Open Issue checkbox', function () {
            jasmineCore.it('When commentsOpenAnIssue is true', function () {
              RB.UserSession.instance.set('commentsOpenAnIssue', true);
              editor = new RB.CommentEditor({
                reviewRequest: reviewRequest,
                reviewRequestEditor: reviewRequestEditor
              });
              dlg = new RB.CommentDialogView({
                animate: false,
                model: editor
              });
              dlg.render();
              const $checkbox = dlg.$('#comment_issue');
              jasmineCore.expect(editor.get('openIssue')).toBe(true);
              jasmineCore.expect($checkbox.prop('checked')).toBe(true);
            });
            jasmineCore.it('When commentsOpenAnIssue is false', function () {
              RB.UserSession.instance.set('commentsOpenAnIssue', false);
              editor = new RB.CommentEditor({
                reviewRequest: reviewRequest,
                reviewRequestEditor: reviewRequestEditor
              });
              dlg = new RB.CommentDialogView({
                animate: false,
                model: editor
              });
              dlg.render();
              const $checkbox = dlg.$('#comment_issue');
              jasmineCore.expect(editor.get('openIssue')).toBe(false);
              jasmineCore.expect($checkbox.prop('checked')).toBe(false);
            });
          });
          jasmineCore.describe('Enable Markdown checkbox', function () {
            jasmineCore.describe('When defaultUseRichText is true', function () {
              jasmineCore.beforeEach(function () {
                RB.UserSession.instance.set('defaultUseRichText', true);
              });
              jasmineCore.it('New comment', function () {
                editor = new RB.CommentEditor({
                  reviewRequest: reviewRequest,
                  reviewRequestEditor: reviewRequestEditor
                });
                dlg = new RB.CommentDialogView({
                  animate: false,
                  model: editor
                });
                dlg.render();
                const $checkbox = dlg.$('#enable_markdown');
                jasmineCore.expect(editor.get('richText')).toBe(true);
                jasmineCore.expect($checkbox.prop('checked')).toBe(true);
                jasmineCore.expect(dlg._textEditor.richText).toBe(true);
              });
              jasmineCore.it('Existing comment with richText=true', function () {
                editor = new RB.CommentEditor({
                  comment: new RB.DiffComment({
                    richText: true
                  }),
                  reviewRequest: reviewRequest,
                  reviewRequestEditor: reviewRequestEditor
                });
                dlg = new RB.CommentDialogView({
                  animate: false,
                  model: editor
                });
                dlg.render();
                const $checkbox = dlg.$('#enable_markdown');
                jasmineCore.expect(editor.get('richText')).toBe(true);
                jasmineCore.expect($checkbox.prop('checked')).toBe(true);
                jasmineCore.expect(dlg._textEditor.richText).toBe(true);
              });
              jasmineCore.it('Existing comment with richText=false', function () {
                editor = new RB.CommentEditor({
                  comment: new RB.DiffComment({
                    richText: false
                  }),
                  reviewRequest: reviewRequest,
                  reviewRequestEditor: reviewRequestEditor
                });
                dlg = new RB.CommentDialogView({
                  animate: false,
                  model: editor
                });
                dlg.render();
                const $checkbox = dlg.$('#enable_markdown');
                jasmineCore.expect(editor.get('richText')).toBe(true);
                jasmineCore.expect($checkbox.prop('checked')).toBe(true);
                jasmineCore.expect(dlg._textEditor.richText).toBe(true);
              });
            });
            jasmineCore.describe('When defaultUseRichText is false', function () {
              jasmineCore.beforeEach(function () {
                RB.UserSession.instance.set('defaultUseRichText', false);
              });
              jasmineCore.it('New comment', function () {
                editor = new RB.CommentEditor({
                  reviewRequest: reviewRequest,
                  reviewRequestEditor: reviewRequestEditor
                });
                dlg = new RB.CommentDialogView({
                  animate: false,
                  model: editor
                });
                dlg.render();
                const $checkbox = dlg.$('#enable_markdown');
                jasmineCore.expect(editor.get('richText')).toBe(false);
                jasmineCore.expect($checkbox.prop('checked')).toBe(false);
                jasmineCore.expect(dlg._textEditor.richText).toBe(false);
              });
              jasmineCore.it('Existing comment with richText=true', function () {
                editor = new RB.CommentEditor({
                  comment: new RB.DiffComment({
                    richText: true
                  }),
                  reviewRequest: reviewRequest,
                  reviewRequestEditor: reviewRequestEditor
                });
                dlg = new RB.CommentDialogView({
                  animate: false,
                  model: editor
                });
                dlg.render();
                const $checkbox = dlg.$('#enable_markdown');
                jasmineCore.expect(editor.get('richText')).toBe(true);
                jasmineCore.expect($checkbox.prop('checked')).toBe(true);
                jasmineCore.expect(dlg._textEditor.richText).toBe(true);
              });
              jasmineCore.it('Existing comment with richText=false', function () {
                editor = new RB.CommentEditor({
                  comment: new RB.DiffComment({
                    richText: false
                  }),
                  reviewRequest: reviewRequest,
                  reviewRequestEditor: reviewRequestEditor
                });
                dlg = new RB.CommentDialogView({
                  animate: false,
                  model: editor
                });
                dlg.render();
                const $checkbox = dlg.$('#enable_markdown');
                jasmineCore.expect(editor.get('richText')).toBe(false);
                jasmineCore.expect($checkbox.prop('checked')).toBe(false);
                jasmineCore.expect(dlg._textEditor.richText).toBe(false);
              });
            });
          });
        });
        jasmineCore.describe('Logged Out indicator', function () {
          jasmineCore.it('When logged in', function () {
            RB.UserSession.instance.set('authenticated', true);
            dlg = new RB.CommentDialogView({
              animate: false,
              model: new RB.CommentEditor({
                reviewRequest: reviewRequest,
                reviewRequestEditor: reviewRequestEditor
              })
            });
            dlg.render();
            jasmineCore.expect(dlg.$el.find('p[class="login-text"]').length).toBe(0);
          });
          jasmineCore.it('When logged out', function () {
            RB.UserSession.instance.set('authenticated', false);
            dlg = new RB.CommentDialogView({
              animate: false,
              model: new RB.CommentEditor({
                reviewRequest: reviewRequest,
                reviewRequestEditor: reviewRequestEditor
              })
            });
            dlg.render();
            jasmineCore.expect(dlg.$el.find('p[class="login-text"]').length).toBe(1);
          });
        });
        jasmineCore.describe('Deleted indicator', function () {
          jasmineCore.it('Shown when deletedWarning != null', function () {
            const commentEditor = new RB.CommentEditor({
              reviewRequest: reviewRequest,
              reviewRequestEditor: reviewRequestEditor
            });
            dlg = new RB.CommentDialogView({
              animate: false,
              deletedWarning: 'warning',
              model: commentEditor
            });
            dlg.render();
            jasmineCore.expect(dlg.$el.find('p[class="deleted-warning"]').length).toBe(1);
            jasmineCore.expect(commentEditor.get('canEdit')).toBe(false);
          });
          jasmineCore.it('Hidden when deletedWarning == null', function () {
            const commentEditor = new RB.CommentEditor({
              reviewRequest: reviewRequest,
              reviewRequestEditor: reviewRequestEditor
            });
            dlg = new RB.CommentDialogView({
              animate: false,
              model: commentEditor
            });
            dlg.render();
            jasmineCore.expect(dlg.$el.find('p[class="deleted-warning"]').length).toBe(0);
            jasmineCore.expect(commentEditor.get('canEdit')).toBe(true);
          });
        });
        jasmineCore.describe('Draft indicator', function () {
          jasmineCore.it('Shown when draftWarning != null', function () {
            dlg = new RB.CommentDialogView({
              animate: false,
              draftWarning: 'warning',
              model: new RB.CommentEditor({
                reviewRequest: reviewRequest,
                reviewRequestEditor: reviewRequestEditor
              })
            });
            dlg.render();
            jasmineCore.expect(dlg.$el.find('p[class="draft-warning"]').length).toBe(1);
          });
          jasmineCore.it('Hidden when draftWarning == null', function () {
            dlg = new RB.CommentDialogView({
              animate: false,
              draftWarning: null,
              model: new RB.CommentEditor({
                reviewRequest: reviewRequest,
                reviewRequestEditor: reviewRequestEditor
              })
            });
            dlg.render();
            jasmineCore.expect(dlg.$el.find('p[class="draft-warning"]').length).toBe(0);
          });
        });
      });
    });

    jasmineSuites.suite('rb/reviews/views/CommentIssueBarView', () => {
      const REVIEW_ID = 1;
      const COMMENT_ID = 2;
      let commentIssueManager;
      let view;
      let review;
      function createComment(commentInfo, attrs) {
        const comment = new commentInfo.CommentCls(attrs);
        jasmineCore.spyOn(comment, 'ready').and.resolveTo();
        jasmineCore.spyOn(comment, 'save').and.resolveTo({
          [commentInfo.rspNamespace]: {
            timestamp: '2022-07-05T01:02:03'
          }
        });
        const createCommentFunc = commentInfo.createCommentFunc;

        /*
         * We always want the last-created comment to win,
         * since that's what we're testing with.
         */
        if (jasmine.isSpy(review[createCommentFunc])) {
          review[createCommentFunc].and.returnValue(comment);
        } else {
          jasmineCore.spyOn(review, createCommentFunc).and.returnValue(comment);
        }
      }
      function getButton(action) {
        const buttonEl = view.el.querySelector(`.ink-c-button[data-action="${action}"]`);
        jasmineCore.expect(buttonEl).toBeTruthy();
        return buttonEl;
      }
      jasmineCore.afterEach(() => {
        view.remove();
        view = null;
        commentIssueManager = null;
        review = null;
      });
      function createCommentIssueBarView(options) {
        view = new RB.CommentIssueBarView(Object.assign({
          canVerify: true,
          commentID: COMMENT_ID,
          commentIssueManager: commentIssueManager,
          commentType: RB.CommentIssueManagerCommentType.DIFF,
          interactive: true,
          issueStatus: RB.CommentIssueStatusType.OPEN,
          reviewID: REVIEW_ID
        }, options));
        view.render();
        return view;
      }
      beforeEach(function () {
        const reviewRequest = new RB.ReviewRequest();
        commentIssueManager = new RB.CommentIssueManager({
          reviewRequest: reviewRequest
        });
        review = reviewRequest.createReview(REVIEW_ID);
        jasmineCore.spyOn(reviewRequest, 'ready').and.resolveTo();
        jasmineCore.spyOn(reviewRequest, 'createReview').and.callFake(() => review);
        jasmineCore.spyOn(review, 'ready').and.resolveTo();
      });
      jasmineCore.describe('Actions', () => {
        let comment;
        beforeEach(() => {
          comment = commentIssueManager.getOrCreateComment({
            commentID: 2,
            commentType: RB.CommentIssueManagerCommentType.DIFF,
            reviewID: 1
          });
          jasmineCore.spyOn(comment, 'ready').and.resolveTo();
          jasmineCore.spyOn(comment, 'getAuthorUsername').and.returnValue('doc');
        });
        jasmineCore.it('Resolving as fixed', done => {
          view = createCommentIssueBarView();
          const resolveButton = getButton('resolve');
          const dropButton = getButton('drop');
          jasmineCore.spyOn(commentIssueManager, 'setCommentIssueStatus').and.callFake(options => {
            jasmineCore.expect(resolveButton.getAttribute('aria-busy')).toBe('true');
            jasmineCore.expect(resolveButton.disabled).toBeFalse();
            jasmineCore.expect(dropButton.getAttribute('aria-busy')).toBeNull();
            jasmineCore.expect(dropButton.disabled).toBeTrue();
            jasmineCore.expect(options).toEqual({
              commentID: COMMENT_ID,
              commentType: RB.CommentIssueManagerCommentType.DIFF,
              newIssueStatus: RB.CommentIssueStatusType.RESOLVED,
              reviewID: REVIEW_ID
            });
            done();
          });
          resolveButton.click();
        });
        jasmineCore.it('Dropping', done => {
          view = createCommentIssueBarView();
          const resolveButton = getButton('resolve');
          const dropButton = getButton('drop');
          jasmineCore.spyOn(commentIssueManager, 'setCommentIssueStatus').and.callFake(options => {
            jasmineCore.expect(resolveButton.getAttribute('aria-busy')).toBeNull();
            jasmineCore.expect(resolveButton.disabled).toBeTrue();
            jasmineCore.expect(dropButton.getAttribute('aria-busy')).toBe('true');
            jasmineCore.expect(dropButton.disabled).toBeFalse();
            jasmineCore.expect(options).toEqual({
              commentID: COMMENT_ID,
              commentType: RB.CommentIssueManagerCommentType.DIFF,
              newIssueStatus: RB.CommentIssueStatusType.DROPPED,
              reviewID: REVIEW_ID
            });
            done();
          });
          dropButton.click();
        });
        jasmineCore.it('Re-opening from resolved', done => {
          comment.set('issueStatus', RB.CommentIssueStatusType.RESOLVED);
          view = createCommentIssueBarView({
            issueStatus: RB.CommentIssueStatusType.RESOLVED
          });
          const reopenButton = getButton('reopen');
          jasmineCore.spyOn(commentIssueManager, 'setCommentIssueStatus').and.callFake(options => {
            jasmineCore.expect(reopenButton.getAttribute('aria-busy')).toBe('true');
            jasmineCore.expect(reopenButton.disabled).toBeFalse();
            jasmineCore.expect(options).toEqual({
              commentID: COMMENT_ID,
              commentType: RB.CommentIssueManagerCommentType.DIFF,
              newIssueStatus: RB.CommentIssueStatusType.OPEN,
              reviewID: REVIEW_ID
            });
            done();
          });
          reopenButton.click();
        });
        jasmineCore.it('Re-opening from dropped', done => {
          comment.set('issueStatus', RB.CommentIssueStatusType.DROPPED);
          view = createCommentIssueBarView({
            issueStatus: RB.CommentIssueStatusType.DROPPED
          });
          const reopenButton = getButton('reopen');
          jasmineCore.spyOn(commentIssueManager, 'setCommentIssueStatus').and.callFake(options => {
            jasmineCore.expect(reopenButton.getAttribute('aria-busy')).toBe('true');
            jasmineCore.expect(reopenButton.disabled).toBeFalse();
            jasmineCore.expect(options).toEqual({
              commentID: COMMENT_ID,
              commentType: RB.CommentIssueManagerCommentType.DIFF,
              newIssueStatus: RB.CommentIssueStatusType.OPEN,
              reviewID: REVIEW_ID
            });
            done();
          });
          reopenButton.click();
        });
        jasmineCore.it('Re-opening from verify-resolved', done => {
          comment.set('issueStatus', RB.CommentIssueStatusType.VERIFYING_RESOLVED);
          view = createCommentIssueBarView({
            issueStatus: RB.CommentIssueStatusType.VERIFYING_RESOLVED
          });
          const reopenButton = getButton('reopen');
          jasmineCore.spyOn(commentIssueManager, 'setCommentIssueStatus').and.callFake(options => {
            jasmineCore.expect(reopenButton.getAttribute('aria-busy')).toBe('true');
            jasmineCore.expect(reopenButton.disabled).toBeFalse();
            jasmineCore.expect(options).toEqual({
              commentID: COMMENT_ID,
              commentType: RB.CommentIssueManagerCommentType.DIFF,
              newIssueStatus: RB.CommentIssueStatusType.OPEN,
              reviewID: REVIEW_ID
            });
            done();
          });
          reopenButton.click();
        });
        jasmineCore.it('Re-opening from verify-dropped', done => {
          comment.set('issueStatus', RB.CommentIssueStatusType.VERIFYING_DROPPED);
          view = createCommentIssueBarView({
            issueStatus: RB.CommentIssueStatusType.VERIFYING_DROPPED
          });
          const reopenButton = getButton('reopen');
          jasmineCore.spyOn(commentIssueManager, 'setCommentIssueStatus').and.callFake(options => {
            jasmineCore.expect(reopenButton.getAttribute('aria-busy')).toBe('true');
            jasmineCore.expect(reopenButton.disabled).toBeFalse();
            jasmineCore.expect(options).toEqual({
              commentID: COMMENT_ID,
              commentType: RB.CommentIssueManagerCommentType.DIFF,
              newIssueStatus: RB.CommentIssueStatusType.OPEN,
              reviewID: REVIEW_ID
            });
            done();
          });
          reopenButton.click();
        });
        jasmineCore.it('Verifying resolved', done => {
          comment.set('issueStatus', RB.CommentIssueStatusType.VERIFYING_RESOLVED);
          comment.get('extraData').require_verification = true;
          view = createCommentIssueBarView({
            issueStatus: RB.CommentIssueStatusType.VERIFYING_RESOLVED
          });
          const reopenButton = getButton('reopen');
          const resolveButton = getButton('verify-resolved');
          jasmineCore.spyOn(commentIssueManager, 'setCommentIssueStatus').and.callFake(options => {
            jasmineCore.expect(resolveButton.getAttribute('aria-busy')).toBe('true');
            jasmineCore.expect(resolveButton.disabled).toBeFalse();
            jasmineCore.expect(reopenButton.getAttribute('aria-busy')).toBeNull();
            jasmineCore.expect(reopenButton.disabled).toBeTrue();
            jasmineCore.expect(options).toEqual({
              commentID: COMMENT_ID,
              commentType: RB.CommentIssueManagerCommentType.DIFF,
              newIssueStatus: RB.CommentIssueStatusType.RESOLVED,
              reviewID: REVIEW_ID
            });
            done();
          });
          resolveButton.click();
        });
        jasmineCore.it('Verifying dropped', done => {
          comment.set('issueStatus', RB.CommentIssueStatusType.VERIFYING_DROPPED);
          comment.get('extraData').require_verification = true;
          view = createCommentIssueBarView({
            issueStatus: RB.CommentIssueStatusType.VERIFYING_DROPPED
          });
          const reopenButton = getButton('reopen');
          const resolveButton = getButton('verify-dropped');
          jasmineCore.spyOn(commentIssueManager, 'setCommentIssueStatus').and.callFake(options => {
            jasmineCore.expect(resolveButton.getAttribute('aria-busy')).toBe('true');
            jasmineCore.expect(resolveButton.disabled).toBeFalse();
            jasmineCore.expect(reopenButton.getAttribute('aria-busy')).toBeNull();
            jasmineCore.expect(reopenButton.disabled).toBeTrue();
            jasmineCore.expect(options).toEqual({
              commentID: COMMENT_ID,
              commentType: RB.CommentIssueManagerCommentType.DIFF,
              newIssueStatus: RB.CommentIssueStatusType.DROPPED,
              reviewID: REVIEW_ID
            });
            done();
          });
          resolveButton.click();
        });
      });
      jasmineCore.describe('Event handling', () => {
        jasmineCore.describe('CommentIssueManager.issueStatusUpdated', () => {
          RB.CommentIssueStatusType.OPEN;

          /* We'll override these for our tests. */
          function _buildTests(commentInfo, otherCommentInfo) {
            beforeEach(() => {
              view = createCommentIssueBarView({
                commentType: commentInfo.commentType
              });
              createComment(commentInfo, {
                id: COMMENT_ID,
                issueStatus: RB.CommentIssueStatusType.RESOLVED
              });
            });
            jasmineCore.it('When comment updated', async () => {
              await commentIssueManager.setCommentIssueStatus({
                commentID: COMMENT_ID,
                commentType: commentInfo.commentType,
                reviewID: REVIEW_ID,
                newIssueStatus: RB.CommentIssueStatusType.RESOLVED
              });
              jasmineCore.expect(view.el.dataset.issueStatus).toBe('resolved');
            });
            jasmineCore.describe('When different comment updated', () => {
              jasmineCore.it('With same ID, different type', async () => {
                createComment(otherCommentInfo, {
                  id: COMMENT_ID,
                  issueStatus: RB.CommentIssueStatusType.RESOLVED
                });
                await commentIssueManager.setCommentIssueStatus({
                  commentID: COMMENT_ID,
                  commentType: otherCommentInfo.commentType,
                  reviewID: REVIEW_ID,
                  newIssueStatus: RB.CommentIssueStatusType.RESOLVED
                });
                jasmineCore.expect(view.el.dataset.issueStatus).toBe('open');
              });
              jasmineCore.it('With different ID, same type', async () => {
                createComment(commentInfo, {
                  id: COMMENT_ID + 1,
                  issueStatus: RB.CommentIssueStatusType.RESOLVED
                });
                await commentIssueManager.setCommentIssueStatus({
                  commentID: COMMENT_ID + 1,
                  commentType: commentInfo.commentType,
                  reviewID: REVIEW_ID,
                  newIssueStatus: RB.CommentIssueStatusType.RESOLVED
                });
                jasmineCore.expect(view.el.dataset.issueStatus).toBe('open');
              });
            });
          }
          jasmineCore.describe('For diff comments', () => {
            _buildTests({
              commentType: RB.CommentIssueManagerCommentType.DIFF,
              CommentCls: RB.DiffComment,
              rspNamespace: 'diff_comment',
              createCommentFunc: 'createDiffComment'
            }, {
              commentType: RB.CommentIssueManagerCommentType.GENERAL,
              CommentCls: RB.GeneralComment,
              rspNamespace: 'general_comment',
              createCommentFunc: 'createGeneralComment'
            });
          });
          jasmineCore.describe('For general comments', () => {
            _buildTests({
              commentType: RB.CommentIssueManagerCommentType.GENERAL,
              CommentCls: RB.GeneralComment,
              rspNamespace: 'general_comment',
              createCommentFunc: 'createGeneralComment'
            }, {
              commentType: RB.CommentIssueManagerCommentType.DIFF,
              CommentCls: RB.DiffComment,
              rspNamespace: 'diff_comment',
              createCommentFunc: 'createDiffComment'
            });
          });
          jasmineCore.describe('For file attachment comments', () => {
            _buildTests({
              commentType: RB.CommentIssueManagerCommentType.FILE_ATTACHMENT,
              CommentCls: RB.FileAttachmentComment,
              rspNamespace: 'file_attachment_comment',
              createCommentFunc: 'createFileAttachmentComment'
            }, {
              commentType: RB.CommentIssueManagerCommentType.GENERAL,
              CommentCls: RB.GeneralComment,
              rspNamespace: 'general_comment',
              createCommentFunc: 'createGeneralComment'
            });
          });
          jasmineCore.describe('For screenshot comments', () => {
            _buildTests({
              commentType: RB.CommentIssueManagerCommentType.SCREENSHOT,
              CommentCls: RB.ScreenshotComment,
              rspNamespace: 'screenshot_comment',
              createCommentFunc: 'createScreenshotComment'
            }, {
              commentType: RB.CommentIssueManagerCommentType.GENERAL,
              CommentCls: RB.GeneralComment,
              rspNamespace: 'general_comment',
              createCommentFunc: 'createGeneralComment'
            });
          });
        });
      });
      jasmineCore.describe('Issue statuses', () => {
        function testIssueStatus(options) {
          const issueStatus = options.issueStatus;
          view = createCommentIssueBarView({
            canVerify: !!options.canVerify,
            interactive: options.interactive,
            issueStatus: issueStatus
          });
          const el = view.el;

          /* Check the buttons. */
          jasmineCore.expect(Array.from(el.querySelectorAll('.ink-c-button')).map(buttonEl => buttonEl.dataset.action)).toEqual(options.expectedActions);

          /* Check the message text. */
          const messageEl = el.querySelector('.rb-c-issue-bar__message');
          jasmineCore.expect(messageEl.textContent).toBe(options.expectedMessage);

          /* Check the data attributes. */
          jasmineCore.expect(el.dataset.issueStatus).toBe(issueStatus);
        }
        jasmineCore.describe('Open', () => {
          jasmineCore.it('When interactive', () => {
            testIssueStatus({
              issueStatus: RB.CommentIssueStatusType.OPEN,
              interactive: true,
              expectedActions: ['resolve', 'drop'],
              expectedMessage: 'An issue was opened.'
            });
          });
          jasmineCore.it('When not interactive', () => {
            testIssueStatus({
              issueStatus: RB.CommentIssueStatusType.OPEN,
              interactive: false,
              expectedActions: [],
              expectedMessage: 'An issue was opened.'
            });
          });
        });
        jasmineCore.describe('Dropped', () => {
          jasmineCore.it('When interactive', () => {
            testIssueStatus({
              issueStatus: RB.CommentIssueStatusType.DROPPED,
              interactive: true,
              expectedActions: ['reopen'],
              expectedMessage: 'The issue has been dropped.'
            });
          });
          jasmineCore.it('When not interactive', () => {
            testIssueStatus({
              issueStatus: RB.CommentIssueStatusType.DROPPED,
              interactive: false,
              expectedActions: [],
              expectedMessage: 'The issue has been dropped.'
            });
          });
        });
        jasmineCore.describe('Fixed', () => {
          jasmineCore.it('When interactive', () => {
            testIssueStatus({
              issueStatus: RB.CommentIssueStatusType.RESOLVED,
              interactive: true,
              expectedActions: ['reopen'],
              expectedMessage: 'The issue has been resolved.'
            });
          });
          jasmineCore.it('When not interactive', () => {
            testIssueStatus({
              issueStatus: RB.CommentIssueStatusType.RESOLVED,
              interactive: false,
              expectedActions: [],
              expectedMessage: 'The issue has been resolved.'
            });
          });
        });
        jasmineCore.describe('Verifying Dropped', () => {
          jasmineCore.describe('When interactive', () => {
            jasmineCore.it('When can verify', () => {
              testIssueStatus({
                canVerify: true,
                issueStatus: RB.CommentIssueStatusType.VERIFYING_DROPPED,
                interactive: true,
                expectedActions: ['reopen', 'verify-dropped'],
                expectedMessage: 'Waiting for verification before dropping...'
              });
            });
            jasmineCore.it('When cannot verify', () => {
              testIssueStatus({
                canVerify: false,
                issueStatus: RB.CommentIssueStatusType.VERIFYING_DROPPED,
                interactive: true,
                expectedActions: ['reopen'],
                expectedMessage: 'Waiting for verification before dropping...'
              });
            });
          });
          jasmineCore.it('When not interactive', () => {
            testIssueStatus({
              issueStatus: RB.CommentIssueStatusType.VERIFYING_DROPPED,
              interactive: false,
              expectedActions: [],
              expectedMessage: 'Waiting for verification before dropping...'
            });
          });
        });
        jasmineCore.describe('Verifying Fixed', () => {
          jasmineCore.describe('When interactive', () => {
            jasmineCore.it('When can verify', () => {
              testIssueStatus({
                canVerify: true,
                issueStatus: RB.CommentIssueStatusType.VERIFYING_RESOLVED,
                interactive: true,
                expectedActions: ['reopen', 'verify-resolved'],
                expectedMessage: 'Waiting for verification before resolving...'
              });
            });
            jasmineCore.it('When cannot verify', () => {
              testIssueStatus({
                canVerify: false,
                issueStatus: RB.CommentIssueStatusType.VERIFYING_RESOLVED,
                interactive: true,
                expectedActions: ['reopen'],
                expectedMessage: 'Waiting for verification before resolving...'
              });
            });
          });
          jasmineCore.it('When not interactive', () => {
            testIssueStatus({
              issueStatus: RB.CommentIssueStatusType.VERIFYING_RESOLVED,
              interactive: false,
              expectedActions: [],
              expectedMessage: 'Waiting for verification before resolving...'
            });
          });
        });
      });
    });

    jasmineSuites.suite('rb/diffviewer/views/DiffReviewableView', function () {
      const diffTableTemplate = _.template(`<table class="sidebyside">
 <thead>
  <tr>
   <th colspan="2">
    <a name="1" class="file-anchor"></a> my-file.txt
   </th>
  </tr>
  <tr>
   <th class="rev">Revision 1</th>
   <th class="rev">Revision 2</th>
  </tr>
 </thead>
 <% _.each(chunks, function(chunk, index) { %>
  <% if (chunk.type === "collapsed") { %>
   <tbody class="diff-header">
    <tr>
     <th>
      <a href="#" class="diff-expand-btn tests-expand-above"
         data-chunk-index="<%= index %>"
         data-lines-of-context="20,0"><img></a>
     </th>
     <th colspan="3">
      <a href="#" class="diff-expand-btn tests-expand-chunk"
         data-chunk-index="<%= index %>"><img> Expand</a>
     </th>
    </tr>
    <tr>
     <th>
      <a href="#" class="diff-expand-btn tests-expand-below"
         data-chunk-index="<%= index %>"
         data-lines-of-context="0,20"><img></a>
     </th>
     <th colspan="3">
      <a href="#" class="diff-expand-btn tests-expand-header"
         data-chunk-index="<%= index %>"
         data-lines-of-context="0,<%= chunk.expandHeaderLines %>">
       <img> <code>Some Function</code>
      </a>
     </th>
    </tr>
   </tbody>
  <% } else { %>
   <tbody class="<%= chunk.type %>
                 <% if (chunk.expanded) { %>loaded<% } %>
                 <%= chunk.extraClass || "" %>"
          id="chunk0.<%= index %>">
    <% for (var i = 0; i < chunk.numRows; i++) { %>
     <tr line="<%= i + chunk.startRow %>">
      <th></th>
      <td>
       <% if (chunk.expanded && i === 0) { %>
        <div class="collapse-floater">
         <div class="rb-c-diff-collapse-button"
              data-chunk-index="<%= index %>"
              data-lines-of-context="0"></div>
        </div>
       <% } %>
      </td>
      <th></th>
      <td></td>
     </tr>
    <% } %>
   </tbody>
  <% } %>
 <% }); %>
</table>`);
      const fileAlertHTMLTemplate = _.template(`<tbody class="rb-c-diff-file-notice">
 <tr>
  <td colspan="4">
   <div class="rb-c-alert -is-warning">
    <div class="rb-c-alert__content">
     <%= contentHTML %>
    </div>
   </div>
  </td>
 </tr>
</tbody>`);
      let reviewRequest;
      let $container;
      let view;
      jasmineCore.beforeEach(function () {
        $container = $('<div>').appendTo($testsScratch);
        reviewRequest = new RB.ReviewRequest();
      });
      jasmineCore.afterEach(function () {
        view.remove();
      });
      jasmineCore.describe('CommentRowSelector', function () {
        let selector;
        let $rows;
        jasmineCore.beforeEach(function () {
          view = new RB.DiffReviewableView({
            el: $(diffTableTemplate({
              chunks: [{
                numRows: 5,
                startRow: 1,
                type: 'equal'
              }, {
                numRows: 10,
                startRow: 6,
                type: 'delete'
              }]
            })),
            model: new RB.DiffReviewable({
              reviewRequest: reviewRequest
            })
          });
          view.render().$el.appendTo($container);
          selector = view._selector;
          $rows = view.$el.find('tbody tr');
        });
        jasmineCore.describe('Selecting range', function () {
          let $startRow;
          let startCell;
          jasmineCore.beforeEach(function () {
            $startRow = $rows.eq(4);
            startCell = $startRow[0].cells[0];
          });
          jasmineCore.it('Beginning selection', function () {
            selector._onMouseOver({
              target: startCell
            });
            selector._onMouseDown({
              target: startCell
            });
            jasmineCore.expect($startRow.hasClass('selected')).toBe(true);
            jasmineCore.expect(selector._$begin[0]).toBe($startRow[0]);
            jasmineCore.expect(selector._$end[0]).toBe($startRow[0]);
            jasmineCore.expect(selector._beginLineNum).toBe(5);
            jasmineCore.expect(selector._endLineNum).toBe(5);
            jasmineCore.expect(selector._lastSeenIndex).toBe($startRow[0].rowIndex);
          });
          jasmineCore.describe('Adding rows to selection', function () {
            jasmineCore.it('Above', function () {
              const $prevRow = $rows.eq(3);
              selector._onMouseOver({
                target: startCell
              });
              selector._onMouseDown({
                target: startCell
              });
              selector._onMouseOver({
                target: $prevRow[0].cells[0]
              });
              jasmineCore.expect($startRow.hasClass('selected')).toBe(true);
              jasmineCore.expect($prevRow.hasClass('selected')).toBe(true);
              jasmineCore.expect(selector._$begin[0]).toBe($prevRow[0]);
              jasmineCore.expect(selector._$end[0]).toBe($startRow[0]);
              jasmineCore.expect(selector._beginLineNum).toBe(4);
              jasmineCore.expect(selector._endLineNum).toBe(5);
              jasmineCore.expect(selector._lastSeenIndex).toBe($prevRow[0].rowIndex);
            });
            jasmineCore.it('Below', function () {
              const $nextRow = $rows.eq(5);
              selector._onMouseOver({
                target: startCell
              });
              selector._onMouseDown({
                target: startCell
              });
              selector._onMouseOver({
                target: $nextRow[0].cells[0]
              });
              jasmineCore.expect($startRow.hasClass('selected')).toBe(true);
              jasmineCore.expect($nextRow.hasClass('selected')).toBe(true);
              jasmineCore.expect(selector._$begin[0]).toBe($startRow[0]);
              jasmineCore.expect(selector._$end[0]).toBe($nextRow[0]);
              jasmineCore.expect(selector._beginLineNum).toBe(5);
              jasmineCore.expect(selector._endLineNum).toBe(6);
              jasmineCore.expect(selector._lastSeenIndex).toBe($nextRow[0].rowIndex);
            });
            jasmineCore.it('Rows inbetween two events', function () {
              const $laterRow = $rows.eq(7);
              selector._onMouseOver({
                target: startCell
              });
              selector._onMouseDown({
                target: startCell
              });
              selector._onMouseOver({
                target: $laterRow[0].cells[0]
              });
              jasmineCore.expect($($rows[4]).hasClass('selected')).toBe(true);
              jasmineCore.expect($($rows[5]).hasClass('selected')).toBe(true);
              jasmineCore.expect($($rows[6]).hasClass('selected')).toBe(true);
              jasmineCore.expect($($rows[7]).hasClass('selected')).toBe(true);
              jasmineCore.expect(selector._$begin[0]).toBe($startRow[0]);
              jasmineCore.expect(selector._$end[0]).toBe($laterRow[0]);
              jasmineCore.expect(selector._beginLineNum).toBe(5);
              jasmineCore.expect(selector._endLineNum).toBe(8);
              jasmineCore.expect(selector._lastSeenIndex).toBe($laterRow[0].rowIndex);
            });
          });
          jasmineCore.describe('Removing rows from selection', function () {
            jasmineCore.it('Above', function () {
              const $prevRow = $rows.eq(3);
              const prevCell = $prevRow[0].cells[0];
              selector._onMouseOver({
                target: startCell
              });
              selector._onMouseDown({
                target: startCell
              });
              selector._onMouseOver({
                target: prevCell
              });
              selector._onMouseOut({
                relatedTarget: startCell,
                target: prevCell
              });
              selector._onMouseOver({
                target: startCell
              });
              jasmineCore.expect($startRow.hasClass('selected')).toBe(true);
              jasmineCore.expect($prevRow.hasClass('selected')).toBe(false);
              jasmineCore.expect(selector._$begin[0]).toBe($startRow[0]);
              jasmineCore.expect(selector._$end[0]).toBe($startRow[0]);
              jasmineCore.expect(selector._beginLineNum).toBe(5);
              jasmineCore.expect(selector._endLineNum).toBe(5);
              jasmineCore.expect(selector._lastSeenIndex).toBe($startRow[0].rowIndex);
            });
            jasmineCore.it('Below', function () {
              const $nextRow = $rows.eq(5);
              const nextCell = $nextRow[0].cells[0];
              selector._onMouseOver({
                target: startCell
              });
              selector._onMouseDown({
                target: startCell
              });
              selector._onMouseOver({
                target: nextCell
              });
              selector._onMouseOut({
                relatedTarget: startCell,
                target: nextCell
              });
              selector._onMouseOver({
                target: startCell
              });
              jasmineCore.expect($startRow.hasClass('selected')).toBe(true);
              jasmineCore.expect($nextRow.hasClass('selected')).toBe(false);
              jasmineCore.expect(selector._$begin[0]).toBe($startRow[0]);
              jasmineCore.expect(selector._$end[0]).toBe($startRow[0]);
              jasmineCore.expect(selector._beginLineNum).toBe(5);
              jasmineCore.expect(selector._endLineNum).toBe(5);
              jasmineCore.expect(selector._lastSeenIndex).toBe($startRow[0].rowIndex);
            });
          });
          jasmineCore.describe('Finishing selection', function () {
            jasmineCore.beforeEach(function () {
              jasmineCore.spyOn(view, 'createAndEditCommentBlock');
            });
            jasmineCore.describe('With single line', function () {
              let $row;
              let cell;
              jasmineCore.beforeEach(function () {
                $row = $($rows[4]);
                cell = $row[0].cells[0];
              });
              jasmineCore.it('And existing comment', function () {
                const onClick = jasmineCore.jasmine.createSpy('onClick');
                $('<a class="commentflag">').click(onClick).appendTo(cell);
                selector._onMouseOver({
                  target: cell
                });
                selector._onMouseDown({
                  target: cell
                });
                selector._onMouseUp({
                  preventDefault: function () {},
                  stopImmediatePropagation: function () {},
                  target: cell
                });
                jasmineCore.expect(view.createAndEditCommentBlock).not.toHaveBeenCalled();
                jasmineCore.expect(onClick).toHaveBeenCalled();
                jasmineCore.expect($row.hasClass('selected')).toBe(false);
                jasmineCore.expect(selector._$begin).toBe(null);
                jasmineCore.expect(selector._$end).toBe(null);
                jasmineCore.expect(selector._beginLineNum).toBe(0);
                jasmineCore.expect(selector._endLineNum).toBe(0);
                jasmineCore.expect(selector._lastSeenIndex).toBe(0);
              });
              jasmineCore.it('And no existing comment', function () {
                selector._onMouseOver({
                  target: cell
                });
                selector._onMouseDown({
                  target: cell
                });
                selector._onMouseUp({
                  target: cell,
                  preventDefault: function () {},
                  stopImmediatePropagation: function () {}
                });
                jasmineCore.expect(view.createAndEditCommentBlock).toHaveBeenCalledWith({
                  $beginRow: $row,
                  $endRow: $row,
                  beginLineNum: 5,
                  endLineNum: 5
                });
                jasmineCore.expect($row.hasClass('selected')).toBe(false);
                jasmineCore.expect(selector._$begin).toBe(null);
                jasmineCore.expect(selector._$end).toBe(null);
                jasmineCore.expect(selector._beginLineNum).toBe(0);
                jasmineCore.expect(selector._endLineNum).toBe(0);
                jasmineCore.expect(selector._lastSeenIndex).toBe(0);
              });
            });
            jasmineCore.describe('With multiple lines', function () {
              let $startRow;
              let $endRow;
              let startCell;
              let endCell;
              jasmineCore.beforeEach(function () {
                $startRow = $rows.eq(4);
                $endRow = $rows.eq(5);
                startCell = $startRow[0].cells[0];
                endCell = $endRow[0].cells[0];
              });
              jasmineCore.xit('And existing comment', function () {
                const onClick = jasmineCore.jasmine.createSpy('onClick');
                $('<a class="commentflag">').click(onClick).appendTo(startCell);
                selector._onMouseOver({
                  target: startCell
                });
                selector._onMouseDown({
                  target: startCell
                });
                selector._onMouseOver({
                  target: endCell
                });
                jasmineCore.expect(selector._$begin[0]).toBe($startRow[0]);
                jasmineCore.expect(selector._$end[0]).toBe($endRow[0]);

                /* Copy these so we can directly compare. */
                $startRow = selector._$begin;
                $endRow = selector._$end;
                selector._onMouseUp({
                  target: endCell,
                  preventDefault: function () {},
                  stopImmediatePropagation: function () {}
                });
                jasmineCore.expect(view.createAndEditCommentBlock).toHaveBeenCalledWith({
                  $beginRow: $startRow,
                  $endRow: $endRow,
                  beginLineNum: 5,
                  endLineNum: 6
                });
                jasmineCore.expect(onClick).not.toHaveBeenCalled();
                jasmineCore.expect($startRow.hasClass('selected')).toBe(false);
                jasmineCore.expect($endRow.hasClass('selected')).toBe(false);
                jasmineCore.expect(selector._$begin).toBe(null);
                jasmineCore.expect(selector._$end).toBe(null);
                jasmineCore.expect(selector._beginLineNum).toBe(0);
                jasmineCore.expect(selector._endLineNum).toBe(0);
                jasmineCore.expect(selector._lastSeenIndex).toBe(0);
              });
              jasmineCore.it('And no existing comment', function () {
                selector._onMouseOver({
                  target: startCell
                });
                selector._onMouseDown({
                  target: startCell
                });
                selector._onMouseOver({
                  target: endCell
                });
                jasmineCore.expect(selector._$begin[0]).toBe($startRow[0]);
                jasmineCore.expect(selector._$end[0]).toBe($endRow[0]);

                /* Copy these so we can directly compare. */
                $startRow = selector._$begin;
                $endRow = selector._$end;
                selector._onMouseUp({
                  target: endCell,
                  preventDefault: function () {},
                  stopImmediatePropagation: function () {}
                });
                jasmineCore.expect(view.createAndEditCommentBlock).toHaveBeenCalledWith({
                  $beginRow: $startRow,
                  $endRow: $endRow,
                  beginLineNum: 5,
                  endLineNum: 6
                });
                jasmineCore.expect($startRow.hasClass('selected')).toBe(false);
                jasmineCore.expect($endRow.hasClass('selected')).toBe(false);
                jasmineCore.expect(selector._$begin).toBe(null);
                jasmineCore.expect(selector._$end).toBe(null);
                jasmineCore.expect(selector._beginLineNum).toBe(0);
                jasmineCore.expect(selector._endLineNum).toBe(0);
                jasmineCore.expect(selector._lastSeenIndex).toBe(0);
              });
            });
          });
        });
        jasmineCore.describe('Hovering', function () {
          jasmineCore.describe('Over line', function () {
            let $row;
            let cell;
            jasmineCore.beforeEach(function () {
              $row = $rows.eq(4);
            });
            jasmineCore.it('Contents cell', function () {
              cell = $row[0].cells[1];
              selector._onMouseOver({
                target: cell
              });
              jasmineCore.expect($row.hasClass('selected')).toBe(false);
              jasmineCore.expect(selector._$ghostCommentFlag.css('display')).toBe('none');
            });
            jasmineCore.describe('Line number cell', function () {
              jasmineCore.beforeEach(function () {
                cell = $row[0].cells[0];
              });
              jasmineCore.it('With existing comment on row', function () {
                $(cell).append('<a class="commentflag">');
                selector._onMouseOver({
                  target: cell
                });
                jasmineCore.expect($row.hasClass('selected')).toBe(true);
                jasmineCore.expect(selector._$ghostCommentFlag.css('display')).toBe('none');
              });
              jasmineCore.it('With no column flag', function () {
                selector._onMouseOver({
                  target: cell
                });
                jasmineCore.expect($row.hasClass('selected')).toBe(true);
                jasmineCore.expect(selector._$ghostCommentFlag.css('display')).not.toBe('none');
              });
            });
          });
          jasmineCore.describe('Out of line', function () {
            jasmineCore.it('Contents cell', function () {
              const $row = $rows.eq(0);
              selector._onMouseOver({
                target: $row[0].cells[0]
              });
              jasmineCore.expect(selector._$ghostCommentFlag.css('display')).not.toBe('none');
              selector._onMouseOut({
                target: $row[0].cells[0]
              });
              jasmineCore.expect(selector._$ghostCommentFlag.css('display')).toBe('none');
            });
            jasmineCore.it('Line number cell', function () {
              const $row = $rows.eq(0);
              selector._onMouseOver({
                target: $row[0].cells[0]
              });
              jasmineCore.expect(selector._$ghostCommentFlag.css('display')).not.toBe('none');
              jasmineCore.expect($row.hasClass('selected')).toBe(true);
              selector._onMouseOut({
                target: $row[0].cells[0]
              });
              jasmineCore.expect(selector._$ghostCommentFlag.css('display')).toBe('none');
              jasmineCore.expect($row.hasClass('selected')).toBe(false);
            });
          });
        });
      });
      jasmineCore.describe('Incremental expansion', function () {
        let model;
        jasmineCore.beforeEach(function () {
          model = new RB.DiffReviewable({
            file: new RB.DiffFile({
              index: 1
            }),
            fileDiffID: 10,
            reviewRequest: reviewRequest,
            revision: 1
          });
        });
        jasmineCore.describe('Expanding', function () {
          jasmineCore.beforeEach(function () {
            view = new RB.DiffReviewableView({
              el: $(diffTableTemplate({
                chunks: [{
                  numRows: 5,
                  startRow: 1,
                  type: 'equal'
                }, {
                  expandHeaderLines: 7,
                  type: 'collapsed'
                }, {
                  numRows: 5,
                  startRow: 10,
                  type: 'delete'
                }]
              })),
              model: model
            });
            view.render().$el.appendTo($container);
          });
          jasmineCore.describe('Fetching fragment', function () {
            jasmineCore.beforeEach(function () {
              jasmineCore.spyOn(model, 'getRenderedDiffFragment').and.resolveTo('abc');
            });
            jasmineCore.it('Full chunk', function () {
              view.$('.tests-expand-chunk').click();
              jasmineCore.expect(model.getRenderedDiffFragment).toHaveBeenCalled();
              const options = model.getRenderedDiffFragment.calls.argsFor(0)[0];
              jasmineCore.expect(options.chunkIndex).toBe(1);
              jasmineCore.expect(options.linesOfContext).toBe(undefined);
            });
            jasmineCore.it('+20 above', function () {
              view.$('.tests-expand-above').click();
              jasmineCore.expect(model.getRenderedDiffFragment).toHaveBeenCalled();
              const options = model.getRenderedDiffFragment.calls.argsFor(0)[0];
              jasmineCore.expect(options.chunkIndex).toBe(1);
              jasmineCore.expect(options.linesOfContext).toBe('20,0');
            });
            jasmineCore.it('+20 below', function () {
              view.$('.tests-expand-below').click();
              jasmineCore.expect(model.getRenderedDiffFragment).toHaveBeenCalled();
              const options = model.getRenderedDiffFragment.calls.argsFor(0)[0];
              jasmineCore.expect(options.chunkIndex).toBe(1);
              jasmineCore.expect(options.linesOfContext).toBe('0,20');
            });
            jasmineCore.it('Function/class', function () {
              view.$('.tests-expand-header').click();
              jasmineCore.expect(model.getRenderedDiffFragment).toHaveBeenCalled();
              const options = model.getRenderedDiffFragment.calls.argsFor(0)[0];
              jasmineCore.expect(options.chunkIndex).toBe(1);
              jasmineCore.expect(options.linesOfContext).toBe('0,7');
            });
          });
          jasmineCore.describe('Injecting HTML', function () {
            jasmineCore.it('Whole chunk', function (done) {
              jasmineCore.spyOn(model, 'getRenderedDiffFragment').and.resolveTo(`<tbody class="equal tests-new-chunk">
 <tr line="6">
  <th></th>
  <td>
   <div class="collapse-floater">
    <div class="rb-c-diff-collapse-button"
         data-chunk-index="1"
         data-lines-of-context="0"></div>
   </div>
  </td>
  <th></th>
  <td></td>
 </tr>
</tbody>`);
              view.on('chunkExpansionChanged', () => {
                jasmineCore.expect(model.getRenderedDiffFragment).toHaveBeenCalled();
                const $tbodies = view.$('tbody');
                jasmineCore.expect($tbodies.length).toBe(3);
                jasmineCore.expect($($tbodies[0]).hasClass('equal')).toBe(true);
                jasmineCore.expect($($tbodies[1]).hasClass('equal')).toBe(true);
                jasmineCore.expect($($tbodies[1]).hasClass('tests-new-chunk')).toBe(true);
                jasmineCore.expect($($tbodies[2]).hasClass('delete')).toBe(true);
                jasmineCore.expect(view._centered._elements.size).toBe(1);
                done();
              });
              view.$('.tests-expand-chunk').click();
            });
            jasmineCore.it('Merging adjacent expanded chunks', function (done) {
              jasmineCore.spyOn(model, 'getRenderedDiffFragment').and.resolveTo(`<tbody class="equal tests-new-chunk">
 <tr line="6">
  <th></th>
  <td>
   <div class="collapse-floater">
    <div class="rb-c-diff-collapse-button"
         data-chunk-index="1"
         data-lines-of-context="0"></div>
   </div>
  </td>
  <th></th>
  <td></td>
 </tr>
</tbody>`);
              view.on('chunkExpansionChanged', () => {
                jasmineCore.expect(model.getRenderedDiffFragment).toHaveBeenCalled();
                const $tbodies = view.$('tbody');
                jasmineCore.expect($tbodies.length).toBe(3);
                jasmineCore.expect($($tbodies[0]).hasClass('equal')).toBe(true);
                jasmineCore.expect($($tbodies[1]).hasClass('equal')).toBe(true);
                jasmineCore.expect($($tbodies[1]).hasClass('tests-new-chunk')).toBe(true);
                jasmineCore.expect($($tbodies[2]).hasClass('delete')).toBe(true);
                jasmineCore.expect(view._centered._elements.size).toBe(1);
                done();
              });

              /*
               * Simulate having a couple nearby partially expanded
               * chunks. These should end up being removed when
               * expanding the chunk.
               */
              $('<tbody class="equal loaded">').append($('<div class="rb-c-diff-collapse-button">')).insertAfter(view.$('tbody')[1]).clone().insertBefore(view.$('tbody')[1]);
              jasmineCore.expect(view.$('tbody').length).toBe(5);
              view.$('.tests-expand-chunk').click();
            });
          });
        });
        jasmineCore.describe('Collapsing', function () {
          let $collapseButton;
          jasmineCore.beforeEach(function () {
            view = new RB.DiffReviewableView({
              el: $(diffTableTemplate({
                chunks: [{
                  numRows: 5,
                  startRow: 1,
                  type: 'equal'
                }, {
                  expanded: true,
                  numRows: 2,
                  startRow: 6,
                  type: 'equal'
                }, {
                  numRows: 5,
                  startRow: 10,
                  type: 'delete'
                }]
              })),
              model: model
            });
            view.render().$el.appendTo($container);
            $collapseButton = view.$('.rb-c-diff-collapse-button');
          });
          jasmineCore.it('Fetching fragment', function (done) {
            jasmineCore.spyOn(model, 'getRenderedDiffFragment').and.resolveTo('abc');
            view.on('chunkExpansionChanged', () => {
              jasmineCore.expect(model.getRenderedDiffFragment).toHaveBeenCalled();
              const options = model.getRenderedDiffFragment.calls.argsFor(0)[0];
              jasmineCore.expect(options.chunkIndex).toBe(1);
              jasmineCore.expect(options.linesOfContext).toBe(0);
              done();
            });
            $collapseButton.click();
          });
          jasmineCore.describe('Injecting HTML', function () {
            jasmineCore.it('Single expanded chunk', function (done) {
              jasmineCore.spyOn(model, 'getRenderedDiffFragment').and.resolveTo(`<tbody class="equal tests-new-chunk">
 <tr line="6">
  <th></th>
  <td></td>
  <th></th>
  <td></td>
 </tr>
</tbody>`);
              view.on('chunkExpansionChanged', () => {
                jasmineCore.expect(model.getRenderedDiffFragment).toHaveBeenCalled();
                const $tbodies = view.$('tbody');
                jasmineCore.expect($tbodies.length).toBe(3);
                jasmineCore.expect($($tbodies[0]).hasClass('equal')).toBe(true);
                jasmineCore.expect($($tbodies[1]).hasClass('equal')).toBe(true);
                jasmineCore.expect($($tbodies[1]).hasClass('tests-new-chunk')).toBe(true);
                jasmineCore.expect($($tbodies[2]).hasClass('delete')).toBe(true);
                jasmineCore.expect(view._centered._elements.size).toBe(0);
                done();
              });
              $collapseButton.click();
            });
            jasmineCore.it('Merging adjacent expanded chunks', function (done) {
              let $tbodies;
              jasmineCore.spyOn(model, 'getRenderedDiffFragment').and.resolveTo(`<tbody class="equal tests-new-chunk">
 <tr line="6">
  <th></th>
  <td></td>
  <th></th>
  <td></td>
 </tr>
</tbody>`);
              view.on('chunkExpansionChanged', () => {
                jasmineCore.expect(model.getRenderedDiffFragment).toHaveBeenCalled();
                $tbodies = view.$('tbody');
                jasmineCore.expect($tbodies.length).toBe(3);
                jasmineCore.expect($($tbodies[0]).hasClass('equal')).toBe(true);
                jasmineCore.expect($($tbodies[1]).hasClass('equal')).toBe(true);
                jasmineCore.expect($($tbodies[1]).hasClass('tests-new-chunk')).toBe(true);
                jasmineCore.expect($($tbodies[2]).hasClass('delete')).toBe(true);
                jasmineCore.expect(view._centered._elements.size).toBe(0);
                done();
              });

              /*
               * Simulate having a couple nearby partially expanded
               * chunks. These should end up being removed when
               * expanding the chunk.
               */
              $('<tbody class="equal loaded">').append($('<div class="rb-c-diff-collapse-button">')).insertAfter(view.$('tbody')[1]).clone().insertBefore(view.$('tbody')[1]);
              $collapseButton.click();
            });
          });
        });
      });
      jasmineCore.describe('Comment flags', function () {
        jasmineCore.describe('Placing visible comments', function () {
          const expandedDiffFragmentHTML = `<tbody class="equal tests-new-chunk">
 <tr line="11">
  <th></th>
  <td>
   <div class="collapse-floater">
    <div class="rb-c-diff-collapse-button"
         data-chunk-index="1"
         data-lines-of-context="0"></div>
   </div>
  </td>
  <th></th>
  <td></td>
 </tr>
</tbody>`;
          let $commentFlag;
          let $commentFlags;
          let $rows;
          let diffFragmentHTML;
          jasmineCore.beforeEach(function () {
            view = new RB.DiffReviewableView({
              el: $(diffTableTemplate({
                chunks: [{
                  numRows: 10,
                  startRow: 1,
                  type: 'insert'
                }, {
                  expandHeaderLines: 7,
                  type: 'collapsed'
                }]
              })),
              model: new RB.DiffReviewable({
                reviewRequest: reviewRequest,
                serializedCommentBlocks: {
                  '11-1': [{
                    comment_id: 1,
                    issue_opened: false,
                    line: 11,
                    localdraft: false,
                    num_lines: 1,
                    review_id: 1,
                    text: 'Comment 4',
                    user: {
                      name: 'testuser',
                      username: 'testuser'
                    }
                  }],
                  '2-2': [{
                    comment_id: 1,
                    issue_opened: false,
                    line: 2,
                    localdraft: false,
                    num_lines: 2,
                    review_id: 1,
                    text: 'Comment 1',
                    user: {
                      name: 'testuser',
                      username: 'testuser'
                    }
                  }],
                  '4-1': [{
                    comment_id: 1,
                    issue_opened: false,
                    line: 4,
                    localdraft: false,
                    num_lines: 1,
                    review_id: 1,
                    text: 'Comment 2',
                    user: {
                      name: 'testuser'
                    }
                  }, {
                    comment_id: 1,
                    issue_opened: false,
                    line: 4,
                    localdraft: false,
                    num_lines: 1,
                    review_id: 1,
                    text: 'Comment 3',
                    user: {
                      name: 'testuser',
                      username: 'testuser'
                    }
                  }]
                }
              })
            });
            view.render().$el.appendTo($container);
            diffFragmentHTML = expandedDiffFragmentHTML;
            jasmineCore.spyOn(view.model, 'getRenderedDiffFragment').and.callFake(() => {
              return Promise.resolve(diffFragmentHTML);
            });
            $commentFlags = view.$('.commentflag');
            $rows = view.$el.find('tbody tr');
          });
          jasmineCore.it('On initial render', function () {
            jasmineCore.expect($commentFlags.length).toBe(2);
            jasmineCore.expect($($commentFlags[0]).find('.commentflag-count').text()).toBe('1');
            jasmineCore.expect($($commentFlags[1]).find('.commentflag-count').text()).toBe('2');
            $commentFlag = $($rows[1]).find('.commentflag');
            jasmineCore.expect($commentFlag.length).toBe(1);
            jasmineCore.expect($commentFlag[0]).toBe($commentFlags[0]);
            jasmineCore.expect($commentFlag.parents('tr').attr('line')).toBe('2');
            $commentFlag = $($rows[3]).find('.commentflag');
            jasmineCore.expect($commentFlag.length).toBe(1);
            jasmineCore.expect($commentFlag[0]).toBe($commentFlags[1]);
            jasmineCore.expect($commentFlag.parents('tr').attr('line')).toBe('4');
          });
          jasmineCore.it('On chunk expand', function (done) {
            jasmineCore.expect($commentFlags.length).toBe(2);
            view.on('chunkExpansionChanged', () => {
              $commentFlags = view.$('.commentflag');
              $rows = view.$el.find('tbody tr');
              jasmineCore.expect($commentFlags.length).toBe(3);
              jasmineCore.expect($($commentFlags[2]).find('.commentflag-count').text()).toBe('1');
              $commentFlag = $($rows[10]).find('.commentflag');
              jasmineCore.expect($commentFlag.length).toBe(1);
              jasmineCore.expect($commentFlag[0]).toBe($commentFlags[2]);
              jasmineCore.expect($commentFlag.parents('tr').attr('line')).toBe('11');
              done();
            });
            view.$('.tests-expand-chunk').click();
          });
          jasmineCore.it('On chunk re-expand (after collapsing)', function (done) {
            const collapsedDiffFragmentHTML = ['<tbody class="diff-header">', $(view.$('tbody')[1]).html(), '</tbody>'].join('');
            jasmineCore.expect($commentFlags.length).toBe(2);
            let n = 0;
            view.on('chunkExpansionChanged', () => {
              n++;
              if (n === 1) {
                jasmineCore.expect(view.$('.commentflag').length).toBe(3);
                diffFragmentHTML = collapsedDiffFragmentHTML;
                view.$('.rb-c-diff-collapse-button').click();
              } else if (n === 2) {
                jasmineCore.expect(view.$('.commentflag').length).toBe(2);
                diffFragmentHTML = expandedDiffFragmentHTML;
                view.$('.tests-expand-chunk').click();
              } else if (n === 3) {
                jasmineCore.expect(view.$('.commentflag').length).toBe(3);
                $commentFlags = view.$('.commentflag');
                $rows = view.$el.find('tbody tr');
                jasmineCore.expect($commentFlags.length).toBe(3);
                jasmineCore.expect($($commentFlags[2]).find('.commentflag-count').text()).toBe('1');
                $commentFlag = $($rows[10]).find('.commentflag');
                jasmineCore.expect($commentFlag.length).toBe(1);
                jasmineCore.expect($commentFlag[0]).toBe($commentFlags[2]);
                jasmineCore.expect($commentFlag.parents('tr').attr('line')).toBe('11');
                done();
              } else {
                done.fail();
              }
            });
            view.$('.tests-expand-chunk').click();
          });
        });
      });
      jasmineCore.describe('Events', function () {
        jasmineCore.describe('Toggle Displayed Unicode Characters', function () {
          let $toggleButton;
          jasmineCore.beforeEach(function () {
            view = new RB.DiffReviewableView({
              el: $(diffTableTemplate({
                chunks: [{
                  extraClass: 'whitespace-chunk',
                  numRows: 5,
                  startRow: 1,
                  type: 'replace'
                }],
                fileAlertHTML: ``
              })),
              model: new RB.DiffReviewable({
                reviewRequest: reviewRequest
              })
            });
            const $el = view.render().$el;
            const $fileAlert = $(fileAlertHTMLTemplate({
              contentHTML: `<button class="rb-o-toggle-ducs"
        data-hide-chars-label="Hide chars"
        data-show-chars-label="Show chars">
</button>`
            }));
            $fileAlert.insertBefore($el[0].tHead);
            $el.appendTo($container);
            $toggleButton = view.$('.rb-o-toggle-ducs');
            jasmineCore.expect($toggleButton.length).toBe(1);
          });
          jasmineCore.it('Show Displayed Unicode Characters', function () {
            $toggleButton.text('Hide chars').click();
            jasmineCore.expect(view.el).toHaveClass('-hide-ducs');
            jasmineCore.expect($toggleButton.text()).toBe('Show chars');
          });
          jasmineCore.it('Hide Displayed Unicode Characters', function () {
            view.$el.addClass('-hide-ducs');
            $toggleButton.text('Show chars').click();
            jasmineCore.expect(view.el).not.toHaveClass('-hide-ducs');
            jasmineCore.expect($toggleButton.text()).toBe('Hide chars');
          });
        });
      });
      jasmineCore.describe('Methods', function () {
        jasmineCore.describe('toggleWhitespaceOnlyChunks', function () {
          jasmineCore.beforeEach(function () {
            view = new RB.DiffReviewableView({
              el: $(diffTableTemplate({
                chunks: [{
                  extraClass: 'whitespace-chunk',
                  numRows: 5,
                  startRow: 1,
                  type: 'replace'
                }]
              })),
              model: new RB.DiffReviewable({
                reviewRequest: reviewRequest
              })
            });
            view.render().$el.appendTo($container);
          });
          jasmineCore.describe('Toggle on', function () {
            jasmineCore.it('Chunk classes', function () {
              view.toggleWhitespaceOnlyChunks();
              const $tbodies = view.$('tbody');
              const $tbody = $($tbodies[0]);
              const $children = $tbody.children();
              jasmineCore.expect($tbody.hasClass('replace')).toBe(false);
              jasmineCore.expect($($children[0]).hasClass('first')).toBe(true);
              jasmineCore.expect($($children[$children.length - 1]).hasClass('last')).toBe(true);
            });
            jasmineCore.it('chunkDimmed event triggered', function () {
              jasmineCore.spyOn(view, 'trigger');
              view.toggleWhitespaceOnlyChunks();
              jasmineCore.expect(view.trigger).toHaveBeenCalledWith('chunkDimmed', '0.0');
            });
            jasmineCore.it('Whitespace-only file classes', function () {
              const $tbodies = view.$el.children('tbody');
              const $whitespaceChunk = $('<tbody>').addClass('whitespace-file').hide().html('<tr><td></td></tr>').appendTo(view.$el);
              jasmineCore.expect($whitespaceChunk.is(':visible')).toBe(false);
              jasmineCore.expect($tbodies.is(':visible')).toBe(true);
              view.toggleWhitespaceOnlyChunks();
              jasmineCore.expect($whitespaceChunk.is(':visible')).toBe(true);
              jasmineCore.expect($tbodies.is(':visible')).toBe(false);
            });
          });
          jasmineCore.describe('Toggle off', function () {
            jasmineCore.it('Chunk classes', function () {
              view.toggleWhitespaceOnlyChunks();
              view.toggleWhitespaceOnlyChunks();
              const $tbodies = view.$('tbody');
              const $tbody = $($tbodies[0]);
              const $children = $tbody.children();
              jasmineCore.expect($tbody.hasClass('replace')).toBe(true);
              jasmineCore.expect($($children[0]).hasClass('first')).toBe(false);
              jasmineCore.expect($($children[$children.length - 1]).hasClass('last')).toBe(false);
            });
            jasmineCore.it('chunkDimmed event triggered', function () {
              view.toggleWhitespaceOnlyChunks();
              jasmineCore.spyOn(view, 'trigger');
              view.toggleWhitespaceOnlyChunks();
              jasmineCore.expect(view.trigger).toHaveBeenCalledWith('chunkUndimmed', '0.0');
            });
            jasmineCore.it('Whitespace-only file classes', function () {
              const $tbodies = view.$el.children('tbody');
              const $whitespaceChunk = $('<tbody>').addClass('whitespace-file').html('<tr><td></td></tr>').hide().appendTo(view.$el);
              jasmineCore.expect($whitespaceChunk.is(':visible')).toBe(false);
              jasmineCore.expect($tbodies.is(':visible')).toBe(true);
              view.toggleWhitespaceOnlyChunks();
              view.toggleWhitespaceOnlyChunks();
              jasmineCore.expect($whitespaceChunk.is(':visible')).toBe(false);
              jasmineCore.expect($tbodies.is(':visible')).toBe(true);
            });
          });
        });
      });
    });

    jasmineSuites.suite('rb/pages/views/DiffViewerPageView', function () {
      /**
       * Make a replacement function for $.ajax(url).
       *
       * Args:
       *     url (string):
       *         The expected URL.
       *
       *     rsp (object):
       *         The response to trigger the done callback with.
       *
       * Returns:
       *     function:
       *     A function to use in ``spyOn().and.fallFake()``.
       *
       *     The returned function returns an object that mimics the return of
       *     ``$.ajax(url)``.
       */
      function makeAjaxFn(url, rsp) {
        return function (url) {
          jasmineCore.expect(url).toBe(url);
          return {
            done(cb) {
              cb(rsp);
            }
          };
        };
      }
      const tableTemplate = _.template(`<div class="diff-container">
 <table class="sidebyside">
  <thead>
   <tr class="filename-row">
    <th colspan="4">
     <a name="<%- fileID %>" class="file-anchor"></a>
    </th>
   </tr>
  </thead>
  <% _.each(chunks, function(chunk) { %>
   <tbody class="<%- chunk.type %>">
    <% _.each(chunk.lines, function(line, i) { %>
     <tr line="<%- line.vNumber %>">
      <th>
       <% if (i === 0 && chunk.type !== "equal") { %>
        <a name="<%- chunk.id %>" class="chunk-anchor"></a>
       <% } %>
       <%- line.leftNumber || "" %>
      </th>
      <td class="l"></td>
      <th><%- line.rightNumber || "" %></th>
      <td class="r"></td>
     </tr>
    <% }); %>
   </tbody>
  <% }); %>
 </table>
</div>`);
      const pageTemplate = `<div>
 <div id="review-banner">
  <div class="banner">
   <h1>You have a pending review.</h1>
   <input id="review-banner-edit" type="button"
          value="Edit Review">
   <div id="review-banner-publish-container"></div>
   <input id="review-banner-discard" type="button"
          value="Discard">
  </div>
 </div>
 <div id="unified-banner">
  <div class="rb-c-unified-banner__mode-selector"></div>
  <div class="rb-c-unified-banner__dock"></div>
 </div>
 <div id="diff_commit_list">
  <div class="commit-list-container"></div>
 </div>
 <div id="view_controls"></div>
 <div id="diffs"></div>
</div>`;
      let page;
      let pageView;
      let $diffs;
      function setupPageView(modelAttrs = {}) {
        page = new RB.DiffViewerPage(_.extend({
          checkForUpdates: false,
          editorData: {
            mutableByUser: true,
            statusMutableByUser: true
          },
          pagination: {
            current_page: 1
          },
          reviewRequestData: {
            id: 123,
            loaded: true,
            state: RB.ReviewRequest.PENDING
          },
          revision: {
            interdiff_revision: null,
            is_interdiff: false,
            revision: 1
          }
        }, modelAttrs), {
          parse: true
        });

        /* Don't communicate with the server for page updates. */
        const reviewRequest = page.get('reviewRequest');
        jasmineCore.spyOn(reviewRequest, 'ready').and.resolveTo();
        jasmineCore.spyOn(reviewRequest.draft, 'ready').and.resolveTo();
        jasmineCore.spyOn(page.get('pendingReview'), 'ready').and.resolveTo();
        pageView = new RB.DiffViewerPageView({
          el: $(pageTemplate).appendTo($testsScratch),
          model: page
        });
        pageView.render();
      }
      jasmineCore.beforeEach(function () {
        /*
         * Disable the router so that the page doesn't change the URL on the
         * page while tests run.
         */
        jasmineCore.spyOn(window.history, 'pushState');
        jasmineCore.spyOn(window.history, 'replaceState');
        jasmineCore.spyOn(RB.HeaderView.prototype, '_ensureSingleton');
        jasmineCore.spyOn(RB, 'navigateTo');

        /* Ensure that tests don't alter cookies. Set defaults. */
        jasmineCore.spyOn($, 'cookie');
        RB.UserSession.instance.set('canToggleExtraWhitespace', false);
        RB.UserSession.instance.set('diffsShowExtraWhitespace', true);
      });
      jasmineCore.afterEach(function () {
        RB.DnDUploader.instance = null;
        if (RB.EnabledFeatures.unifiedBanner) {
          RB.UnifiedBannerView.resetInstance();
        }
        if (pageView) {
          pageView.remove();
          pageView = null;
        }
        Backbone.history.stop();
      });
      jasmineCore.describe('Diff view buttons', function () {
        jasmineCore.describe('Initial state', function () {
          jasmineCore.it('Defaults', function () {
            setupPageView();
            jasmineCore.expect(page.get('allChunksCollapsed')).toBeFalse();
            jasmineCore.expect(page.get('canToggleExtraWhitespace')).toBeFalse();
            const $buttons = pageView.$('#view_controls button');
            jasmineCore.expect($buttons.length).toBe(2);
            let $button = $buttons.eq(0);
            jasmineCore.expect($button.attr('id')).toBe('action-diff-toggle-collapse-changes');
            jasmineCore.expect($button.text().trim()).toBe('Collapse changes');
            jasmineCore.expect($button.attr('title')).toBe('All lines of the files are being shown. Toggle to ' + 'collapse down to only modified sections instead.');
            $button = $buttons.eq(1);
            jasmineCore.expect($button.attr('id')).toBe('action-diff-toggle-whitespace-only');
            jasmineCore.expect($button.text().trim()).toBe('Hide whitespace-only changes');
            jasmineCore.expect($button.attr('title')).toBe('Sections of the diff containing only whitespace ' + 'changes are being shown. Toggle to hide those instead.');
          });
          jasmineCore.it('With allChunksCollapsed=true', function () {
            setupPageView({
              allChunksCollapsed: true
            });
            jasmineCore.expect(page.get('allChunksCollapsed')).toBeTrue();
            jasmineCore.expect(page.get('canToggleExtraWhitespace')).toBeFalse();
            const $buttons = pageView.$('#view_controls button');
            jasmineCore.expect($buttons.length).toBe(2);
            let $button = $buttons.eq(0);
            jasmineCore.expect($button.attr('id')).toBe('action-diff-toggle-collapse-changes');
            jasmineCore.expect($button.text().trim()).toBe('Expand changes');
            jasmineCore.expect($button.attr('title')).toBe('Only modified sections of the files are being shown. ' + 'Toggle to show all lines instead.');
            $button = $buttons.eq(1);
            jasmineCore.expect($button.attr('id')).toBe('action-diff-toggle-whitespace-only');
            jasmineCore.expect($button.text().trim()).toBe('Hide whitespace-only changes');
            jasmineCore.expect($button.attr('title')).toBe('Sections of the diff containing only whitespace ' + 'changes are being shown. Toggle to hide those instead.');
          });
          jasmineCore.it('With canToggleExtraWhitespace=true', function () {
            setupPageView({
              canToggleExtraWhitespace: true
            });
            jasmineCore.expect(page.get('allChunksCollapsed')).toBeFalse();
            jasmineCore.expect(page.get('canToggleExtraWhitespace')).toBeTrue();
            const $buttons = pageView.$('#view_controls button');
            jasmineCore.expect($buttons.length).toBe(3);
            let $button = $buttons.eq(0);
            jasmineCore.expect($button.attr('id')).toBe('action-diff-toggle-collapse-changes');
            jasmineCore.expect($button.text().trim()).toBe('Collapse changes');
            jasmineCore.expect($button.attr('title')).toBe('All lines of the files are being shown. Toggle to ' + 'collapse down to only modified sections instead.');
            $button = $buttons.eq(1);
            jasmineCore.expect($button.attr('id')).toBe('action-diff-toggle-extra-whitespace');
            jasmineCore.expect($button.text().trim()).toBe('Hide extra whitespace');
            jasmineCore.expect($button.attr('title')).toBe('Mismatched indentation and trailing whitespace are ' + 'being shown. Toggle to hide instead.');
            $button = $buttons.eq(2);
            jasmineCore.expect($button.attr('id')).toBe('action-diff-toggle-whitespace-only');
            jasmineCore.expect($button.text().trim()).toBe('Hide whitespace-only changes');
            jasmineCore.expect($button.attr('title')).toBe('Sections of the diff containing only whitespace ' + 'changes are being shown. Toggle to hide those instead.');
          });
          jasmineCore.it('With canToggleExtraWhitespace=true and ' + 'diffsShowExtraWhitespace=true', function () {
            RB.UserSession.instance.set('diffsShowExtraWhitespace', true);
            setupPageView({
              canToggleExtraWhitespace: true
            });
            jasmineCore.expect(page.get('allChunksCollapsed')).toBeFalse();
            jasmineCore.expect(page.get('canToggleExtraWhitespace')).toBeTrue();
            const $buttons = pageView.$('#view_controls button');
            jasmineCore.expect($buttons.length).toBe(3);
            let $button = $buttons.eq(0);
            jasmineCore.expect($button.attr('id')).toBe('action-diff-toggle-collapse-changes');
            jasmineCore.expect($button.text().trim()).toBe('Collapse changes');
            jasmineCore.expect($button.attr('title')).toBe('All lines of the files are being shown. Toggle to ' + 'collapse down to only modified sections instead.');
            $button = $buttons.eq(1);
            jasmineCore.expect($button.attr('id')).toBe('action-diff-toggle-extra-whitespace');
            jasmineCore.expect($button.text().trim()).toBe('Hide extra whitespace');
            jasmineCore.expect($button.attr('title')).toBe('Mismatched indentation and trailing whitespace are ' + 'being shown. Toggle to hide instead.');
            $button = $buttons.eq(2);
            jasmineCore.expect($button.attr('id')).toBe('action-diff-toggle-whitespace-only');
            jasmineCore.expect($button.text().trim()).toBe('Hide whitespace-only changes');
            jasmineCore.expect($button.attr('title')).toBe('Sections of the diff containing only whitespace ' + 'changes are being shown. Toggle to hide those instead.');
          });
        });
        jasmineCore.describe('Actions', function () {
          jasmineCore.it('Collapse changes', function () {
            setupPageView({
              allChunksCollapsed: false
            });
            const $button = pageView.$('#action-diff-toggle-collapse-changes');
            jasmineCore.expect($button.length).toBe(1);
            jasmineCore.expect($button.text().trim()).toBe('Collapse changes');
            $button.click();
            jasmineCore.expect(RB.navigateTo).toHaveBeenCalledWith('.?collapse=1');
            jasmineCore.expect($button.text().trim()).toBe('Expand changes');
          });
          jasmineCore.it('Expand changes', function () {
            setupPageView({
              allChunksCollapsed: true
            });
            const $button = pageView.$('#action-diff-toggle-collapse-changes');
            jasmineCore.expect($button.length).toBe(1);
            jasmineCore.expect($button.text().trim()).toBe('Expand changes');
            $button.click();
            jasmineCore.expect(RB.navigateTo).toHaveBeenCalledWith('.?expand=1');
            jasmineCore.expect($button.text().trim()).toBe('Collapse changes');
          });
          jasmineCore.it('Show extra whitespace', function () {
            RB.UserSession.instance.set('diffsShowExtraWhitespace', false);
            setupPageView({
              canToggleExtraWhitespace: true
            });
            const $button = pageView.$('#action-diff-toggle-extra-whitespace');
            jasmineCore.expect($button.length).toBe(1);
            jasmineCore.expect($button.text().trim()).toBe('Show extra whitespace');
            $button.click();
            jasmineCore.expect(RB.UserSession.instance.get('diffsShowExtraWhitespace')).toBeTrue();
            jasmineCore.expect($button.text().trim()).toBe('Hide extra whitespace');
          });
          jasmineCore.it('Hide extra whitespace', function () {
            RB.UserSession.instance.set('diffsShowExtraWhitespace', true);
            setupPageView({
              canToggleExtraWhitespace: true
            });
            const $button = pageView.$('#action-diff-toggle-extra-whitespace');
            jasmineCore.expect($button.length).toBe(1);
            jasmineCore.expect($button.text().trim()).toBe('Hide extra whitespace');
            $button.click();
            jasmineCore.expect(RB.UserSession.instance.get('diffsShowExtraWhitespace')).toBeFalse();
            jasmineCore.expect($button.text().trim()).toBe('Show extra whitespace');
          });
          jasmineCore.it('Show whitespace-only changes', function () {
            setupPageView();
            const diffReviewableView = new RB.DiffReviewableView();
            jasmineCore.spyOn(diffReviewableView, 'toggleWhitespaceOnlyChunks');
            pageView._diffReviewableViews = [diffReviewableView];
            const $button = pageView.$('#action-diff-toggle-whitespace-only');
            jasmineCore.expect($button.length).toBe(1);
            jasmineCore.expect($button.text().trim()).toBe('Hide whitespace-only changes');

            /*
             * We have to do this twice, since we hard-code a default
             * active state to true.
             */
            $button.click();
            jasmineCore.expect(diffReviewableView.toggleWhitespaceOnlyChunks).toHaveBeenCalled();
            jasmineCore.expect($button.text().trim()).toBe('Show whitespace-only changes');

            /* Do it again. */
            $button.click();
            jasmineCore.expect(diffReviewableView.toggleWhitespaceOnlyChunks).toHaveBeenCalled();
            jasmineCore.expect($button.text().trim()).toBe('Hide whitespace-only changes');
          });
          jasmineCore.it('Hide whitespace-only changes', function () {
            setupPageView();
            const diffReviewableView = new RB.DiffReviewableView();
            jasmineCore.spyOn(diffReviewableView, 'toggleWhitespaceOnlyChunks');
            pageView._diffReviewableViews = [diffReviewableView];
            const $button = pageView.$('#action-diff-toggle-whitespace-only');
            jasmineCore.expect($button.length).toBe(1);
            jasmineCore.expect($button.text().trim()).toBe('Hide whitespace-only changes');
            $button.click();
            jasmineCore.expect(diffReviewableView.toggleWhitespaceOnlyChunks).toHaveBeenCalled();
            jasmineCore.expect($button.text().trim()).toBe('Show whitespace-only changes');
          });
        });
      });
      jasmineCore.describe('Without commits', function () {
        jasmineCore.beforeEach(function () {
          setupPageView({
            canToggleExtraWhitespace: true
          });
          $diffs = pageView.$el.children('#diffs');
        });
        jasmineCore.describe('Anchors', function () {
          jasmineCore.it('Tracks all types', function () {
            $diffs.html(tableTemplate({
              chunks: [{
                id: '1.1',
                lines: [{
                  leftNumber: 100,
                  rightNumber: 101,
                  type: 'insert',
                  vNumber: 100
                }]
              }, {
                id: '1.2',
                lines: [{
                  leftNumber: 101,
                  rightNumber: 101,
                  type: 'equal',
                  vNumber: 101
                }]
              }, {
                id: '1.3',
                lines: [{
                  leftNumber: 102,
                  rightNumber: 101,
                  type: 'delete',
                  vNumber: 102
                }]
              }],
              fileID: 'file1'
            }));
            pageView._updateAnchors(pageView.$el.find('table').eq(0));
            jasmineCore.expect(pageView._$anchors.length).toBe(4);
            jasmineCore.expect(pageView._$anchors[0].name).toBe('file1');
            jasmineCore.expect(pageView._$anchors[1].name).toBe('1.1');
            jasmineCore.expect(pageView._$anchors[2].name).toBe('1.2');
            jasmineCore.expect(pageView._$anchors[3].name).toBe('1.3');
            jasmineCore.expect(pageView._selectedAnchorIndex).toBe(0);
          });
          jasmineCore.describe('Navigation', function () {
            jasmineCore.beforeEach(function () {
              $diffs.html([tableTemplate({
                chunks: [{
                  id: '1.1',
                  lines: [{
                    leftNumber: 100,
                    rightNumber: 101,
                    type: 'insert',
                    vNumber: 100
                  }]
                }, {
                  id: '1.2',
                  lines: [{
                    leftNumber: 101,
                    rightNumber: 101,
                    type: 'equal',
                    vNumber: 101
                  }]
                }],
                fileID: 'file1'
              }), tableTemplate({
                chunks: [],
                fileID: 'file2'
              }), tableTemplate({
                chunks: [{
                  id: '2.1',
                  lines: [{
                    leftNumber: 100,
                    rightNumber: 101,
                    type: 'insert',
                    vNumber: 100
                  }]
                }, {
                  id: '2.2',
                  lines: [{
                    leftNumber: 101,
                    rightNumber: 101,
                    type: 'equal',
                    vNumber: 101
                  }]
                }],
                fileID: 'file3'
              })]);
              pageView.$el.find('table').each(function () {
                pageView._updateAnchors($(this));
              });
            });
            jasmineCore.describe('Previous file', function () {
              jasmineCore.it('From file', function () {
                pageView.selectAnchorByName('file2');
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(3);
                pageView._selectPreviousFile();
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(0);
              });
              jasmineCore.it('From chunk', function () {
                pageView.selectAnchorByName('2.2');
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(6);
                pageView._selectPreviousFile();
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(4);
              });
              jasmineCore.it('On first file', function () {
                pageView.selectAnchorByName('file1');
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(0);
                pageView._selectPreviousFile();
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(0);
              });
            });
            jasmineCore.describe('Next file', function () {
              jasmineCore.it('From file', function () {
                pageView.selectAnchorByName('file1');
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(0);
                pageView._selectNextFile();
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(3);
              });
              jasmineCore.it('From chunk', function () {
                pageView.selectAnchorByName('1.1');
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(1);
                pageView._selectNextFile();
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(3);
              });
              jasmineCore.it('On last file', function () {
                pageView.selectAnchorByName('file3');
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(4);
                pageView._selectNextFile();
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(4);
              });
            });
            jasmineCore.describe('Previous anchor', function () {
              jasmineCore.it('From file to file', function () {
                pageView.selectAnchorByName('file3');
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(4);
                pageView._selectPreviousDiff();
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(3);
              });
              jasmineCore.it('From file to chunk', function () {
                pageView.selectAnchorByName('file2');
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(3);
                pageView._selectPreviousDiff();
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(2);
              });
              jasmineCore.it('From chunk to file', function () {
                pageView.selectAnchorByName('2.1');
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(5);
                pageView._selectPreviousDiff();
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(4);
              });
              jasmineCore.it('From chunk to chunk', function () {
                pageView.selectAnchorByName('2.2');
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(6);
                pageView._selectPreviousDiff();
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(5);
              });
              jasmineCore.it('On first file', function () {
                pageView.selectAnchorByName('file1');
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(0);
                pageView._selectPreviousDiff();
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(0);
              });
            });
            jasmineCore.describe('Next anchor', function () {
              jasmineCore.it('From file to file', function () {
                pageView.selectAnchorByName('file2');
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(3);
                pageView._selectNextDiff();
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(4);
              });
              jasmineCore.it('From file to chunk', function () {
                pageView.selectAnchorByName('file1');
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(0);
                pageView._selectNextDiff();
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(1);
              });
              jasmineCore.it('From chunk to file', function () {
                pageView.selectAnchorByName('1.2');
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(2);
                pageView._selectNextDiff();
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(3);
              });
              jasmineCore.it('From chunk to chunk', function () {
                pageView.selectAnchorByName('2.1');
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(5);
                pageView._selectNextDiff();
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(6);
              });
              jasmineCore.it('On last chunk', function () {
                pageView.selectAnchorByName('2.2');
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(6);
                pageView._selectNextDiff();
                jasmineCore.expect(pageView._selectedAnchorIndex).toBe(6);
              });
            });
          });
        });
        jasmineCore.describe('Key bindings', function () {
          function triggerKeyPress(c) {
            const evt = $.Event('keypress');
            evt.which = c.charCodeAt(0);
            pageView.$el.trigger(evt);
          }
          function testKeys(description, funcName, keyList) {
            jasmineCore.describe(description, function () {
              keyList.forEach(key => {
                let label;
                let c;
                if (key.length === 2) {
                  label = key[0];
                  c = key[1];
                } else {
                  label = "'" + key + "'";
                  c = key;
                }
                jasmineCore.it(label, function () {
                  jasmineCore.spyOn(pageView, funcName);
                  triggerKeyPress(c);
                  jasmineCore.expect(pageView[funcName]).toHaveBeenCalled();
                });
              });
            });
          }
          testKeys('Previous file', '_selectPreviousFile', ['a', 'A', 'K', 'P', '<', 'm']);
          testKeys('Next file', '_selectNextFile', ['f', 'F', 'J', 'N', '>']);
          testKeys('Previous anchor', '_selectPreviousDiff', ['s', 'S', 'k', 'p', ',']);
          testKeys('Next anchor', '_selectNextDiff', ['d', 'D', 'j', 'n', '.']);
          testKeys('Previous comment', '_selectPreviousComment', ['[', 'x']);
          testKeys('Next comment', '_selectNextComment', [']', 'c']);
          testKeys('Recenter selected', '_recenterSelected', [['Enter', '\x0d']]);
          testKeys('Create comment', '_createComment', ['r', 'R']);
        });
        jasmineCore.describe('Reviewable Management', function () {
          jasmineCore.beforeEach(function () {
            jasmineCore.spyOn(pageView, 'queueLoadDiff');
          });
          jasmineCore.it('File added', function () {
            jasmineCore.expect($diffs.find('.diff-container').length).toBe(0);
            jasmineCore.expect(pageView.queueLoadDiff.calls.count()).toBe(0);
            page.files.reset([new RB.DiffFile({
              filediff: {
                id: 200,
                revision: 1
              },
              id: 100
            })]);
            jasmineCore.expect($diffs.find('.diff-container').length).toBe(1);
            jasmineCore.expect(pageView.queueLoadDiff.calls.count()).toBe(1);
          });
          jasmineCore.it('Files reset', function () {
            jasmineCore.expect($diffs.find('.diff-container').length).toBe(0);
            jasmineCore.expect(pageView.queueLoadDiff.calls.count()).toBe(0);

            /* Add an initial batch of files. */
            page.files.reset([new RB.DiffFile({
              filediff: {
                id: 200,
                revision: 1
              },
              id: 100
            })]);
            jasmineCore.expect($diffs.find('.diff-container').length).toBe(1);
            jasmineCore.expect(pageView.queueLoadDiff.calls.count()).toBe(1);

            /* Now do another. */
            page.files.reset([new RB.DiffFile({
              filediff: {
                id: 201,
                revision: 2
              },
              id: 101
            })]);
            const $containers = $diffs.find('.diff-container');
            jasmineCore.expect($containers.length).toBe(1);
            jasmineCore.expect($containers.find('.sidebyside')[0].id).toBe('file_container_101');
            jasmineCore.expect(pageView.queueLoadDiff.calls.count()).toBe(2);
          });
        });
        jasmineCore.describe('Page view/URL state', function () {
          let router;
          jasmineCore.beforeEach(function () {
            jasmineCore.spyOn(page, 'loadDiffRevision');

            /*
             * Bypass all the actual history logic and get to the actual
             * router handler.
             */
            jasmineCore.spyOn(Backbone.history, 'matchRoot').and.returnValue(true);
            router = pageView.router;
            jasmineCore.spyOn(router, 'navigate').and.callFake((url, options) => {
              if (!options || options.trigger !== false) {
                Backbone.history.loadUrl(url);
              }
            });
          });
          jasmineCore.describe('Initial URL', function () {
            jasmineCore.it('Initial default load', function () {
              pageView._setInitialURL('', 'index_header');
              jasmineCore.expect(router.navigate).toHaveBeenCalledWith('1/#index_header', {
                replace: true,
                trigger: false
              });
              jasmineCore.expect(page.loadDiffRevision).not.toHaveBeenCalled();
            });
            jasmineCore.it('Initial load of first page explicit', function () {
              pageView._setInitialURL('?page=1', 'index_header');
              jasmineCore.expect(router.navigate).toHaveBeenCalledWith('1/?page=1#index_header', {
                replace: true,
                trigger: false
              });
              jasmineCore.expect(page.loadDiffRevision).not.toHaveBeenCalled();
            });
            jasmineCore.it('Initial load of page > 1', function () {
              pageView._setInitialURL('?page=2', 'index_header');
              jasmineCore.expect(router.navigate).toHaveBeenCalledWith('1/?page=2#index_header', {
                replace: true,
                trigger: false
              });
              jasmineCore.expect(page.loadDiffRevision).not.toHaveBeenCalled();
            });
            jasmineCore.it('Initial load of interdiff', function () {
              page.revision.set('revision', 2);
              page.revision.set('interdiffRevision', 3);
              pageView._setInitialURL('?page=2', 'index_header');
              jasmineCore.expect(router.navigate).toHaveBeenCalledWith('2-3/?page=2#index_header', {
                replace: true,
                trigger: false
              });
              jasmineCore.expect(page.loadDiffRevision).not.toHaveBeenCalled();
            });
            jasmineCore.it('Initial load with filename patterns', function () {
              pageView._setInitialURL('?filenames=*.js,src/*', 'index_header');
              jasmineCore.expect(router.navigate).toHaveBeenCalledWith('1/?filenames=*.js,src/*#index_header', {
                replace: true,
                trigger: false
              });
              jasmineCore.expect(page.loadDiffRevision).not.toHaveBeenCalled();
            });
          });
          jasmineCore.describe('_navigate', function () {
            jasmineCore.beforeEach(function () {
              page.set('filenamePatterns', '*.js,src/*');
            });
            jasmineCore.it('With page == 1', function () {
              pageView._navigate({
                page: 1
              });
              jasmineCore.expect(router.navigate).toHaveBeenCalledWith('1/?filenames=*.js%2Csrc%2F*', {
                trigger: true
              });
              jasmineCore.expect(page.loadDiffRevision).toHaveBeenCalledWith({
                baseCommitID: null,
                filenamePatterns: '*.js,src/*',
                interdiffRevision: null,
                page: 1,
                revision: 1,
                tipCommitID: null
              });
            });
            jasmineCore.it('With page > 1', function () {
              pageView._navigate({
                page: 2
              });
              jasmineCore.expect(router.navigate).toHaveBeenCalledWith('1/?page=2&filenames=*.js%2Csrc%2F*', {
                trigger: true
              });
              jasmineCore.expect(page.loadDiffRevision).toHaveBeenCalledWith({
                baseCommitID: null,
                filenamePatterns: '*.js,src/*',
                interdiffRevision: null,
                page: 2,
                revision: 1,
                tipCommitID: null
              });
            });
            jasmineCore.it('New revision on page > 1', function () {
              page.pagination.set('currentPage', 2);
              pageView._onRevisionSelected([0, 2]);
              jasmineCore.expect(router.navigate).toHaveBeenCalledWith('2/?filenames=*.js%2Csrc%2F*', {
                trigger: true
              });
              jasmineCore.expect(page.loadDiffRevision).toHaveBeenCalledWith({
                baseCommitID: null,
                filenamePatterns: '*.js,src/*',
                interdiffRevision: null,
                page: 1,
                revision: 2,
                tipCommitID: null
              });
            });
            jasmineCore.it('Same revision on page > 1', function () {
              page.pagination.set('currentPage', 2);
              pageView._navigate({
                revision: 1
              });
              jasmineCore.expect(router.navigate).toHaveBeenCalledWith('1/?page=2&filenames=*.js%2Csrc%2F*', {
                trigger: true
              });
              jasmineCore.expect(page.loadDiffRevision).toHaveBeenCalledWith({
                baseCommitID: null,
                filenamePatterns: '*.js,src/*',
                interdiffRevision: null,
                page: 2,
                revision: 1,
                tipCommitID: null
              });
            });
            jasmineCore.it('With updateURLOnly', function () {
              page.pagination.set('currentPage', 2);
              pageView._navigate({
                interdiffRevision: 3,
                revision: 2,
                updateURLOnly: true
              });
              jasmineCore.expect(router.navigate).toHaveBeenCalledWith('2-3/?filenames=*.js%2Csrc%2F*', {
                replace: true,
                trigger: false
              });
              jasmineCore.expect(page.loadDiffRevision).not.toHaveBeenCalled();
            });
            jasmineCore.it('With anchor', function () {
              pageView._navigate({
                anchor: 'test'
              });
              jasmineCore.expect(router.navigate).toHaveBeenCalledWith('1/?filenames=*.js%2Csrc%2F*#test', {
                trigger: true
              });
              jasmineCore.expect(page.loadDiffRevision).toHaveBeenCalledWith({
                baseCommitID: null,
                filenamePatterns: '*.js,src/*',
                interdiffRevision: null,
                page: 1,
                revision: 1,
                tipCommitID: null
              });
            });
          });
          jasmineCore.describe('Revision selector', function () {
            jasmineCore.describe('New diff revision selected', function () {
              jasmineCore.it('From single revision', function () {
                pageView._onRevisionSelected([0, 2]);
                jasmineCore.expect(router.navigate).toHaveBeenCalledWith('2/', {
                  trigger: true
                });
                jasmineCore.expect(page.loadDiffRevision).toHaveBeenCalledWith({
                  baseCommitID: null,
                  filenamePatterns: null,
                  interdiffRevision: null,
                  page: 1,
                  revision: 2,
                  tipCommitID: null
                });
              });
              jasmineCore.it('From interdiff revision', function () {
                page.revision.set('interdiffRevision', 2);
                pageView._onRevisionSelected([0, 2]);
                jasmineCore.expect(router.navigate).toHaveBeenCalledWith('2/', {
                  trigger: true
                });
                jasmineCore.expect(page.loadDiffRevision).toHaveBeenCalledWith({
                  baseCommitID: null,
                  filenamePatterns: null,
                  interdiffRevision: null,
                  page: 1,
                  revision: 2,
                  tipCommitID: null
                });
              });
            });
            jasmineCore.it('New interdiff revision selected', function () {
              pageView._onRevisionSelected([2, 5]);
              jasmineCore.expect(router.navigate).toHaveBeenCalledWith('2-5/', {
                trigger: true
              });
              jasmineCore.expect(page.loadDiffRevision).toHaveBeenCalledWith({
                baseCommitID: null,
                filenamePatterns: null,
                interdiffRevision: 5,
                page: 1,
                revision: 2,
                tipCommitID: null
              });
            });
          });
          jasmineCore.describe('Page selector', function () {
            jasmineCore.it('With page == 1', function () {
              pageView._onPageSelected(true, 1);
              jasmineCore.expect(router.navigate).toHaveBeenCalledWith('1/', {
                trigger: true
              });
              jasmineCore.expect(page.loadDiffRevision).toHaveBeenCalledWith({
                baseCommitID: null,
                filenamePatterns: null,
                interdiffRevision: null,
                page: 1,
                revision: 1,
                tipCommitID: null
              });
            });
            jasmineCore.it('With page > 1', function () {
              pageView._onPageSelected(true, 2);
              jasmineCore.expect(router.navigate).toHaveBeenCalledWith('1/?page=2', {
                trigger: true
              });
              jasmineCore.expect(page.loadDiffRevision).toHaveBeenCalledWith({
                baseCommitID: null,
                filenamePatterns: null,
                interdiffRevision: null,
                page: 2,
                revision: 1,
                tipCommitID: null
              });
            });
          });
          jasmineCore.it('Anchor selection', function () {
            const $anchor = $('<a name="test">');
            pageView.selectAnchor($anchor);
            jasmineCore.expect(router.navigate).toHaveBeenCalledWith('1/#test', {
              replace: true,
              trigger: false
            });
            jasmineCore.expect(page.loadDiffRevision).not.toHaveBeenCalled();
          });
        });
      });
      jasmineCore.describe('With commits', function () {
        let $commitList;
        jasmineCore.beforeEach(function () {
          page = new RB.DiffViewerPage({
            checkForUpdates: false,
            commits: [{
              author_name: 'Author Name',
              commit_id: 'r123',
              commit_message: 'Commit message 1',
              id: 1,
              parent_id: 'r122'
            }, {
              author_name: 'Author Name',
              commit_id: 'r124',
              commit_message: 'Commit message 2',
              id: 2,
              parent_id: 'r123'
            }, {
              author_name: 'Author Name',
              commit_id: 'r125',
              commit_message: 'Commit message 3',
              id: 3,
              parent_id: 'r124'
            }],
            editorData: {
              mutableByUser: true,
              statusMutableByUser: true
            },
            pagination: {
              current_page: 1
            },
            reviewRequestData: {
              id: 123,
              loaded: true,
              state: RB.ReviewRequest.PENDING
            },
            revision: {
              interdiff_revision: null,
              is_interdiff: false,
              revision: 1
            }
          }, {
            parse: true
          });
          pageView = new RB.DiffViewerPageView({
            el: $(pageTemplate).appendTo($testsScratch),
            model: page
          });
          $commitList = $testsScratch.find('#diff_commit_list');

          /* Don't communicate with the server for page updates. */
          const reviewRequest = page.get('reviewRequest');
          jasmineCore.spyOn(reviewRequest, 'ready').and.resolveTo();
          jasmineCore.spyOn(reviewRequest.draft, 'ready').and.resolveTo();
          jasmineCore.spyOn(page.get('pendingReview'), 'ready').and.resolveTo();
        });
        jasmineCore.describe('Render', function () {
          jasmineCore.it('Initial render (without interdiff)', function () {
            pageView.render();
            const $table = $commitList.find('table');
            jasmineCore.expect($table.length).toBe(1);
            jasmineCore.expect($table.find('tbody tr').length).toBe(3);
          });
          jasmineCore.it('Initial render (with interdiff)', function () {
            page.revision.set('interdiffRevision', 456);
            page.commitHistoryDiff.reset([{
              entry_type: RB.CommitHistoryDiffEntry.REMOVED,
              old_commit_id: 1
            }, {
              entry_type: RB.CommitHistoryDiffEntry.ADDED,
              new_commit_id: 2
            }, {
              entry_type: RB.CommitHistoryDiffEntry.ADDED,
              new_commit_id: 3
            }], {
              parse: true
            });
            pageView.render();
            const $table = $commitList.find('table');
            jasmineCore.expect($table.length).toBe(1);
            jasmineCore.expect($table.find('tbody tr').length).toBe(3);
          });
          jasmineCore.it('Subsequent render (without interdiff)', function () {
            pageView.render();
            jasmineCore.spyOn($, 'ajax').and.callFake(makeAjaxFn('/api/review-requests/123/diff-context/?revision=2', {
              diff_context: {
                commits: [{
                  author_name: 'Author Name',
                  commit_id: 'r125',
                  commit_message: 'Commit message',
                  id: 4,
                  parent_id: 'r124'
                }],
                revision: {
                  interdiff_revision: null,
                  is_interdiff: false,
                  revision: 2
                }
              }
            }));
            page.loadDiffRevision({
              revision: 2
            });
            jasmineCore.expect($.ajax).toHaveBeenCalled();
            const $table = $commitList.find('table');
            jasmineCore.expect($table.length).toBe(1);
            jasmineCore.expect($table.find('tbody tr').length).toBe(1);
          });
          jasmineCore.it('Subsequent render (with interdiff)', function () {
            pageView.render();
            const rspPayload = {
              diff_context: {
                commit_history_diff: [{
                  entry_type: RB.CommitHistoryDiffEntry.REMOVED,
                  old_commit_id: 1
                }, {
                  entry_type: RB.CommitHistoryDiffEntry.ADDED,
                  new_commit_id: 2
                }],
                commits: [{
                  author_name: 'Author Name',
                  commit_id: 'r124',
                  commit_message: 'Commit message',
                  id: 1
                }, {
                  author_name: 'Author Name',
                  commit_id: 'r125',
                  commit_message: 'Commit message',
                  id: 2
                }],
                revision: {
                  interdiff_revision: 3,
                  is_interdiff: true,
                  revision: 2
                }
              }
            };
            jasmineCore.spyOn($, 'ajax').and.callFake(makeAjaxFn('/api/review-requests/123/diff-context/' + '?revision=2&interdiff-revision=3', rspPayload));
            page.loadDiffRevision({
              interdiffRevision: 3,
              revision: 2
            });
            jasmineCore.expect($.ajax).toHaveBeenCalled();
            const $table = $commitList.find('table');
            jasmineCore.expect($table.length).toBe(1);
            jasmineCore.expect($table.find('tbody tr').length).toBe(2);
          });
          jasmineCore.it('Initial render with base commit ID', function () {
            page.revision.set('baseCommitID', 1);
            pageView.render();
            const commitListModel = pageView._commitListView.model;
            jasmineCore.expect(commitListModel.get('baseCommitID')).toBe(1);
            jasmineCore.expect(commitListModel.get('tipCommitID')).toBe(null);
          });
          jasmineCore.it('Initial render with tip commit ID', function () {
            page.revision.set('tipCommitID', 2);
            pageView.render();
            const commitListModel = pageView._commitListView.model;
            jasmineCore.expect(commitListModel.get('baseCommitID')).toBe(null);
            jasmineCore.expect(commitListModel.get('tipCommitID')).toBe(2);
          });
          jasmineCore.it('Initial render with base commit ID and tip commit ID', function () {
            page.revision.set({
              baseCommitID: 1,
              tipCommitID: 2
            });
            pageView.render();
            const commitListModel = pageView._commitListView.model;
            jasmineCore.expect(commitListModel.get('baseCommitID')).toBe(1);
            jasmineCore.expect(commitListModel.get('tipCommitID')).toBe(2);
          });
        });
        jasmineCore.describe('Page view/URL state', function () {
          jasmineCore.beforeEach(function () {
            jasmineCore.spyOn(page, 'loadDiffRevision').and.callThrough();
            jasmineCore.spyOn(Backbone.history, 'matchRoot').and.returnValue(true);
            jasmineCore.spyOn(pageView.router, 'navigate').and.callFake((url, options) => {
              if (!options || options.trigger !== false) {
                Backbone.history.loadUrl(url);
              }
            });
          });
          jasmineCore.describe('Initial URL', function () {
            jasmineCore.it('With base-commit-id', function () {
              pageView._setInitialURL('?base-commit-id=2', 'index_header');
              jasmineCore.expect(pageView.router.navigate).toHaveBeenCalledWith('1/?base-commit-id=2#index_header', {
                replace: true,
                trigger: false
              });
              jasmineCore.expect(page.loadDiffRevision).not.toHaveBeenCalled();
            });
            jasmineCore.it('With tip-commit-id', function () {
              pageView._setInitialURL('?tip-commit-id=2', 'index_header');
              jasmineCore.expect(pageView.router.navigate).toHaveBeenCalledWith('1/?tip-commit-id=2#index_header', {
                replace: true,
                trigger: false
              });
              jasmineCore.expect(page.loadDiffRevision).not.toHaveBeenCalled();
            });
            jasmineCore.it('With base-commit-id and tip-commit-id', function () {
              pageView._setInitialURL('?base-commit-id=1&tip-commit-id=2', 'index_header');
              jasmineCore.expect(pageView.router.navigate).toHaveBeenCalledWith('1/?base-commit-id=1&tip-commit-id=2#index_header', {
                replace: true,
                trigger: false
              });
              jasmineCore.expect(page.loadDiffRevision).not.toHaveBeenCalled();
            });
          });
          jasmineCore.describe('Commit range controls', function () {
            jasmineCore.it('Selecting initial base commit ID', function () {
              pageView.render();
              const $table = $commitList.find('table');
              const $rows = $table.find('tbody tr');
              jasmineCore.expect($table.length).toBe(1);
              jasmineCore.expect($rows.length).toBe(3);
              jasmineCore.spyOn($, 'ajax').and.callFake(makeAjaxFn('/api/review-requests/123/diff-context/' + '?revision=1&base-commit-id=1', {
                diff_context: {
                  revision: {
                    base_commit_id: 1,
                    interdiff_revision: null,
                    is_interdiff: false,
                    revision: 1,
                    tip_commit_id: null
                  }
                }
              }));
              $rows.eq(1).find('.base-commit-selector').click();
              jasmineCore.expect(pageView.router.navigate).toHaveBeenCalledWith('1/?base-commit-id=1', {
                trigger: true
              });
              jasmineCore.expect(page.loadDiffRevision).toHaveBeenCalledWith({
                baseCommitID: 1,
                filenamePatterns: null,
                interdiffRevision: null,
                page: 1,
                revision: 1,
                tipCommitID: null
              });
              jasmineCore.expect(page.revision.get('baseCommitID')).toBe(1);
              jasmineCore.expect(page.revision.get('tipCommitID')).toBe(null);
              const diffCommitListModel = pageView._commitListView.model;
              jasmineCore.expect(diffCommitListModel.get('baseCommitID')).toBe(1);
              jasmineCore.expect(diffCommitListModel.get('tipCommitID')).toBe(null);
            });
            jasmineCore.it('Selecting initial tip commit ID', function () {
              pageView.render();
              const $table = $commitList.find('table');
              const $rows = $table.find('tbody tr');
              jasmineCore.expect($table.length).toBe(1);
              jasmineCore.expect($rows.length).toBe(3);
              jasmineCore.spyOn($, 'ajax').and.callFake(makeAjaxFn('/api/review-requests/123/diff-context/' + '?revision=1&tip-commit-id=2', {
                diff_context: {
                  revision: {
                    base_commit_id: null,
                    interdiff_revision: null,
                    is_interdiff: false,
                    revision: 1,
                    tip_commit_id: 2
                  }
                }
              }));
              $rows.eq(1).find('.tip-commit-selector').click();
              jasmineCore.expect(pageView.router.navigate).toHaveBeenCalledWith('1/?tip-commit-id=2', {
                trigger: true
              });
              jasmineCore.expect(page.loadDiffRevision).toHaveBeenCalledWith({
                baseCommitID: null,
                filenamePatterns: null,
                interdiffRevision: null,
                page: 1,
                revision: 1,
                tipCommitID: 2
              });
              jasmineCore.expect(page.revision.get('baseCommitID')).toBe(null);
              jasmineCore.expect(page.revision.get('tipCommitID')).toBe(2);
              const diffCommitListModel = pageView._commitListView.model;
              jasmineCore.expect(diffCommitListModel.get('baseCommitID')).toBe(null);
              jasmineCore.expect(diffCommitListModel.get('tipCommitID')).toBe(2);
            });
            jasmineCore.it('Selecting new base commit ID', function () {
              page.revision.set('baseCommitID', 3);
              pageView.render();
              const $table = $commitList.find('table');
              const $rows = $table.find('tbody tr');
              jasmineCore.expect($table.length).toBe(1);
              jasmineCore.expect($rows.length).toBe(3);
              jasmineCore.spyOn($, 'ajax').and.callFake(makeAjaxFn('/api/review-requests/123/diff-context/' + '?revision=1&base-commit-id=1', {
                diff_context: {
                  revision: {
                    base_commit_id: 1,
                    interdiff_revision: null,
                    is_interdiff: false,
                    revision: 1,
                    tip_commit_id: null
                  }
                }
              }));
              $rows.eq(1).find('.base-commit-selector').click();
              jasmineCore.expect(pageView.router.navigate).toHaveBeenCalledWith('1/?base-commit-id=1', {
                trigger: true
              });
              jasmineCore.expect(page.loadDiffRevision).toHaveBeenCalledWith({
                baseCommitID: 1,
                filenamePatterns: null,
                interdiffRevision: null,
                page: 1,
                revision: 1,
                tipCommitID: null
              });
              jasmineCore.expect(page.revision.get('baseCommitID')).toBe(1);
              jasmineCore.expect(page.revision.get('tipCommitID')).toBe(null);
              const diffCommitListModel = pageView._commitListView.model;
              jasmineCore.expect(diffCommitListModel.get('baseCommitID')).toBe(1);
              jasmineCore.expect(diffCommitListModel.get('tipCommitID')).toBe(null);
            });
            jasmineCore.it('Selecting new tip commit ID', function () {
              page.revision.set('tipCommitID', 2);
              pageView.render();
              const $table = $commitList.find('table');
              const $rows = $table.find('tbody tr');
              jasmineCore.expect($table.length).toBe(1);
              jasmineCore.expect($rows.length).toBe(3);
              jasmineCore.spyOn($, 'ajax').and.callFake(makeAjaxFn('/api/review-requests/123/diff-context/' + '?revision=1&tip-commit-id=1', {
                diff_context: {
                  revision: {
                    base_commit_id: null,
                    interdiff_revision: null,
                    is_interdiff: false,
                    revision: 1,
                    tip_commit_id: 1
                  }
                }
              }));
              $rows.eq(0).find('.tip-commit-selector').click();
              jasmineCore.expect(pageView.router.navigate).toHaveBeenCalledWith('1/?tip-commit-id=1', {
                trigger: true
              });
              jasmineCore.expect(page.loadDiffRevision).toHaveBeenCalledWith({
                baseCommitID: null,
                filenamePatterns: null,
                interdiffRevision: null,
                page: 1,
                revision: 1,
                tipCommitID: 1
              });
              jasmineCore.expect(page.revision.get('baseCommitID')).toBe(null);
              jasmineCore.expect(page.revision.get('tipCommitID')).toBe(1);
              const diffCommitListModel = pageView._commitListView.model;
              jasmineCore.expect(diffCommitListModel.get('baseCommitID')).toBe(null);
              jasmineCore.expect(diffCommitListModel.get('tipCommitID')).toBe(1);
            });
            jasmineCore.it('Selecting blank base commit ID', function () {
              page.revision.set('baseCommitID', 2);
              pageView.render();
              const $table = $commitList.find('table');
              const $rows = $table.find('tbody tr');
              jasmineCore.expect($table.length).toBe(1);
              jasmineCore.expect($rows.length).toBe(3);
              jasmineCore.spyOn($, 'ajax').and.callFake(makeAjaxFn('/api/review-requests/123/diff-context/' + '?revision=1', {
                diff_context: {
                  revision: {
                    base_commit_id: null,
                    interdiff_revision: null,
                    is_interdiff: false,
                    revision: 1,
                    tip_commit_id: null
                  }
                }
              }));
              $rows.eq(0).find('.base-commit-selector').click();
              jasmineCore.expect(pageView.router.navigate).toHaveBeenCalledWith('1/', {
                trigger: true
              });
              jasmineCore.expect(page.loadDiffRevision).toHaveBeenCalledWith({
                baseCommitID: null,
                filenamePatterns: null,
                interdiffRevision: null,
                page: 1,
                revision: 1,
                tipCommitID: null
              });
              jasmineCore.expect(page.revision.get('baseCommitID')).toBe(null);
              jasmineCore.expect(page.revision.get('tipCommitID')).toBe(null);
              const diffCommitListModel = pageView._commitListView.model;
              jasmineCore.expect(diffCommitListModel.get('baseCommitID')).toBe(null);
              jasmineCore.expect(diffCommitListModel.get('tipCommitID')).toBe(null);
            });
            jasmineCore.it('Selecting blank tip commit ID', function () {
              page.revision.set('tipCommitID', 2);
              pageView.render();
              const $table = $commitList.find('table');
              const $rows = $table.find('tbody tr');
              jasmineCore.expect($table.length).toBe(1);
              jasmineCore.expect($rows.length).toBe(3);
              jasmineCore.spyOn($, 'ajax').and.callFake(makeAjaxFn('/api/review-requests/123/diff-context/' + '?revision=1', {
                diff_context: {
                  revision: {
                    base_commit_id: null,
                    interdiff_revision: null,
                    is_interdiff: false,
                    revision: 1,
                    tip_commit_id: null
                  }
                }
              }));
              $rows.eq(2).find('.tip-commit-selector').click();
              jasmineCore.expect(pageView.router.navigate).toHaveBeenCalledWith('1/', {
                trigger: true
              });
              jasmineCore.expect(page.loadDiffRevision).toHaveBeenCalledWith({
                baseCommitID: null,
                filenamePatterns: null,
                interdiffRevision: null,
                page: 1,
                revision: 1,
                tipCommitID: null
              });
              jasmineCore.expect(page.revision.get('baseCommitID')).toBe(null);
              jasmineCore.expect(page.revision.get('tipCommitID')).toBe(null);
              const diffCommitListModel = pageView._commitListView.model;
              jasmineCore.expect(diffCommitListModel.get('baseCommitID')).toBe(null);
              jasmineCore.expect(diffCommitListModel.get('tipCommitID')).toBe(null);
            });
          });
        });
      });
    });

    jasmineSuites.suite('rb/views/FileAttachmentThumbnailView', function () {
      let reviewRequest;
      let model;
      let view;
      let reviewRequestEditor;
      let reviewRequestEditorView;
      jasmineCore.beforeEach(function () {
        reviewRequest = new RB.ReviewRequest();
        model = new RB.FileAttachment({
          downloadURL: 'http://example.com/file.png',
          filename: 'file.png'
        });
        reviewRequestEditor = new RB.ReviewRequestEditor({
          reviewRequest
        });
        reviewRequestEditorView = new RB.ReviewRequestEditorView({
          model: reviewRequestEditor
        });
        jasmineCore.spyOn(model, 'trigger').and.callThrough();
      });
      jasmineCore.describe('Rendering', function () {
        function expectElements() {
          jasmineCore.expect(view.$('a.edit').length).toBe(1);
          jasmineCore.expect(view.$('.file-caption').length).toBe(1);
          jasmineCore.expect(view.$('.file-actions').length).toBe(1);
          jasmineCore.expect(view.$('.file-state-container').length).toBe(1);
          if (model.get('state') === RB.FileAttachmentStates.PENDING_DELETION) {
            jasmineCore.expect(view.$('.file-undo-delete').length).toBe(view.options.canEdit && model.get('loaded') ? 1 : 0);
            jasmineCore.expect(view.$('.file-update').length).toBe(0);
          } else {
            jasmineCore.expect(view.$('.file-delete').length).toBe(view.options.canEdit && model.get('loaded') ? 1 : 0);
            jasmineCore.expect(view.$('.file-update').length).toBe(view.options.canEdit && model.get('loaded') ? 1 : 0);
          }
        }
        function expectAttributeMatches() {
          jasmineCore.expect(view.$('.file-download').attr('href')).toBe(model.get('downloadURL'));
          jasmineCore.expect(view.$('.file-caption .edit').text()).toBe(model.get('caption'));
        }
        jasmineCore.it('Using existing elements', function () {
          const $el = $('<div>').addClass(RB.FileAttachmentThumbnailView.prototype.className).html(RB.FileAttachmentThumbnailView.prototype.template(_.defaults({
            caption: 'No caption',
            captionClass: 'edit empty-caption'
          }, model.attributes)));
          model.set('loaded', true);
          view = new RB.FileAttachmentThumbnailView({
            el: $el,
            model: model,
            renderThumbnail: true,
            reviewRequest: reviewRequest,
            reviewRequestEditor: reviewRequestEditor,
            reviewRequestEditorView: reviewRequestEditorView
          });
          $testsScratch.append(view.$el);
          view.render();
          expectElements();
          jasmineCore.expect(view.$('.file-actions').is(':visible')).toBe(true);
          jasmineCore.expect(view.$('.djblets-o-spinner').length).toBe(0);
          jasmineCore.expect(view.$('.file-state-container').html()).toEqual('');
        });
        jasmineCore.it('Rendered thumbnail with unloaded model', function () {
          view = new RB.FileAttachmentThumbnailView({
            model: model,
            renderThumbnail: true,
            reviewRequest: reviewRequest,
            reviewRequestEditor: reviewRequestEditor,
            reviewRequestEditorView: reviewRequestEditorView
          });
          $testsScratch.append(view.$el);
          view.render();
          expectElements();
          jasmineCore.expect(view.$('.file-actions').children().length).toBe(0);
          jasmineCore.expect(view.$('.djblets-o-spinner').length).toBe(1);
          jasmineCore.expect(view.$('.file-state-container').html()).toEqual('');
        });
        jasmineCore.describe('Rendered thumbnail with loaded model', function () {
          jasmineCore.beforeEach(function () {
            model.id = 123;
            model.attributes.id = 123;
            model.set('attachmentHistoryID', 1);
            model.set('caption', 'My Caption');
            model.set('loaded', true);
            model.url = '/api/file-attachments/123/';
          });
          jasmineCore.it('With review UI', function () {
            model.set('reviewURL', '/review/');
            view = new RB.FileAttachmentThumbnailView({
              model: model,
              renderThumbnail: true,
              reviewRequest: reviewRequest,
              reviewRequestEditor: reviewRequestEditor,
              reviewRequestEditorView: reviewRequestEditorView
            });
            $testsScratch.append(view.$el);
            view.render();
            expectElements();
            expectAttributeMatches();
            jasmineCore.expect(view.$('.file-actions').children().length).toBe(2);
            jasmineCore.expect(view.$('.djblets-o-spinner').length).toBe(0);
            jasmineCore.expect(view.$('.file-review').length).toBe(1);
            jasmineCore.expect(view.$('.file-add-comment').length).toBe(0);
            jasmineCore.expect(view.$('.file-state-container').html()).toEqual('');
          });
          jasmineCore.it('No review UI', function () {
            view = new RB.FileAttachmentThumbnailView({
              model: model,
              renderThumbnail: true,
              reviewRequest: reviewRequest,
              reviewRequestEditor: reviewRequestEditor,
              reviewRequestEditorView: reviewRequestEditorView
            });
            $testsScratch.append(view.$el);
            view.render();
            expectElements();
            expectAttributeMatches();
            jasmineCore.expect(view.$('.file-actions').children().length).toBe(2);
            jasmineCore.expect(view.$('.djblets-o-spinner').length).toBe(0);
            jasmineCore.expect(view.$('.file-review').length).toBe(0);
            jasmineCore.expect(view.$('.file-add-comment').length).toBe(1);
            jasmineCore.expect(view.$('.file-state-container').html()).toEqual('');
          });
          jasmineCore.describe('With being able to edit', function () {
            jasmineCore.it('With a published attachment', function () {
              model.set('state', RB.FileAttachmentStates.PUBLISHED);
              model.set('publishedCaption', model.get('caption'));
              view = new RB.FileAttachmentThumbnailView({
                canEdit: true,
                model: model,
                renderThumbnail: true,
                reviewRequest: reviewRequest,
                reviewRequestEditor: reviewRequestEditor,
                reviewRequestEditorView: reviewRequestEditorView
              });
              $testsScratch.append(view.$el);
              view.render();
              expectElements();
              expectAttributeMatches();
              jasmineCore.expect(view.$('.file-actions').children().length).toBe(4);
              jasmineCore.expect(view.$('.fa-spinner').length).toBe(0);
              jasmineCore.expect(view.$('.file-review').length).toBe(0);
              jasmineCore.expect(view.$('.file-add-comment').length).toBe(1);
              jasmineCore.expect(view.$('.file-state-container').html()).toEqual('');
              jasmineCore.expect(view._captionEditorView).not.toBe(undefined);
              jasmineCore.expect(view.$('.file-delete').text().trim()).toEqual('Delete');
            });
            jasmineCore.it('With a draft attachment', function () {
              model.set('state', RB.FileAttachmentStates.DRAFT);
              view = new RB.FileAttachmentThumbnailView({
                canEdit: true,
                model: model,
                renderThumbnail: true,
                reviewRequest: reviewRequest,
                reviewRequestEditor: reviewRequestEditor,
                reviewRequestEditorView: reviewRequestEditorView
              });
              $testsScratch.append(view.$el);
              view.render();
              expectElements();
              expectAttributeMatches();
              jasmineCore.expect(view.$('.file-actions').children().length).toBe(4);
              jasmineCore.expect(view.$('.fa-spinner').length).toBe(0);
              jasmineCore.expect(view.$('.file-review').length).toBe(0);
              jasmineCore.expect(view.$('.file-add-comment').length).toBe(1);
              jasmineCore.expect(view.$('.file-state-container').html()).not.toEqual('');
              jasmineCore.expect(view._captionEditorView).not.toBe(undefined);
              jasmineCore.expect(view.$('.file-delete').text().trim()).toEqual('Delete Draft');
            });
            jasmineCore.it('With an attachment pending deletion', function () {
              model.set('state', RB.FileAttachmentStates.PENDING_DELETION);
              view = new RB.FileAttachmentThumbnailView({
                canEdit: true,
                model: model,
                renderThumbnail: true,
                reviewRequest: reviewRequest,
                reviewRequestEditor: reviewRequestEditor,
                reviewRequestEditorView: reviewRequestEditorView
              });
              $testsScratch.append(view.$el);
              view.render();
              expectElements();
              expectAttributeMatches();
              jasmineCore.expect(view.$('.file-actions').children().length).toBe(3);
              jasmineCore.expect(view.$('.fa-spinner').length).toBe(0);
              jasmineCore.expect(view.$('.file-review').length).toBe(0);
              jasmineCore.expect(view.$('.file-add-comment').length).toBe(1);
              jasmineCore.expect(view.$('.file-state-container').html()).not.toEqual('');
              jasmineCore.expect(view.$('.file-delete').length).toBe(0);
              jasmineCore.expect(view.$('.file-undo-delete').length).toBe(1);
              jasmineCore.expect(view._captionEditorView).toBe(undefined);
            });
          });
        });
      });
      jasmineCore.describe('Actions', function () {
        jasmineCore.beforeEach(function () {
          model.id = 123;
          model.attributes.id = 123;
          model.set('loaded', true);
          model.url = '/api/file-attachments/123/';
          view = new RB.FileAttachmentThumbnailView({
            canEdit: true,
            model: model,
            renderThumbnail: true,
            reviewRequest: reviewRequest,
            reviewRequestEditor: reviewRequestEditor,
            reviewRequestEditorView: reviewRequestEditorView
          });
          $testsScratch.append(view.$el);
          view.render();
          jasmineCore.spyOn(view, 'trigger').and.callThrough();
        });
        jasmineCore.it('Begin caption editing', function () {
          view._captionEditorView.startEdit();
          jasmineCore.expect(view.trigger).toHaveBeenCalledWith('beginEdit');
        });
        jasmineCore.it('Cancel caption editing', function () {
          view._captionEditorView.startEdit();
          jasmineCore.expect(view.trigger).toHaveBeenCalledWith('beginEdit');
          view._captionEditorView.cancel();
          jasmineCore.expect(view.trigger).toHaveBeenCalledWith('endEdit');
        });
        jasmineCore.it('Save caption', function (done) {
          jasmineCore.spyOn(model, 'save').and.callFake(() => {
            jasmineCore.expect(view.trigger).toHaveBeenCalledWith('endEdit');
            jasmineCore.expect(model.get('caption')).toBe('Foo');
            jasmineCore.expect(model.save).toHaveBeenCalled();
            done();
          });
          view._captionEditorView.startEdit();
          jasmineCore.expect(view.trigger).toHaveBeenCalledWith('beginEdit');
          view.$('input').val('Foo').triggerHandler('keyup');
          view._captionEditorView.submit();
        });
        jasmineCore.it('Save empty caption', function (done) {
          jasmineCore.spyOn(model, 'save').and.callFake(() => {
            jasmineCore.expect(view.trigger).toHaveBeenCalledWith('endEdit');
            jasmineCore.expect(model.get('caption')).toBe('');
            jasmineCore.expect(model.save).toHaveBeenCalled();
            done();
          });
          view._captionEditorView.startEdit();
          jasmineCore.expect(view.trigger).toHaveBeenCalledWith('beginEdit');
          view.$('input').val('').triggerHandler('keyup');
          view._captionEditorView.submit();
        });
        jasmineCore.it('Delete', function (done) {
          jasmineCore.spyOn(model, 'destroy').and.callThrough();
          jasmineCore.spyOn($, 'ajax').and.callFake(options => options.success());
          jasmineCore.spyOn(view.$el, 'fadeOut').and.callFake(done => done());
          jasmineCore.spyOn(view, 'remove').and.callFake(() => {
            jasmineCore.expect($.ajax).toHaveBeenCalled();
            jasmineCore.expect(model.destroy).toHaveBeenCalled();
            jasmineCore.expect(model.trigger.calls.argsFor(2)[0]).toBe('destroying');
            jasmineCore.expect(view.$el.fadeOut).toHaveBeenCalled();
            done();
          });
          view.$('.file-delete').click();
        });
        jasmineCore.it('Delete a draft', function () {
          const saveSpyFunc = val => {
            jasmineCore.expect(val).toBe('Old Caption');
            return Promise.resolve();
          };
          model.set('caption', 'New caption');
          model.set('publishedCaption', 'Old Caption');
          model.set('state', RB.FileAttachmentStates.DRAFT);
          view = new RB.FileAttachmentThumbnailView({
            canEdit: true,
            model: model,
            renderThumbnail: true,
            reviewRequest: reviewRequest,
            reviewRequestEditor: reviewRequestEditor,
            reviewRequestEditorView: reviewRequestEditorView
          });
          $testsScratch.append(view.$el);
          view.render();
          jasmineCore.spyOn(model, 'destroy').and.callThrough();
          jasmineCore.spyOn(view, '_saveCaption').and.callFake(saveSpyFunc);
          jasmineCore.spyOn($, 'ajax').and.callFake(options => options.success());
          jasmineCore.spyOn(view.$el, 'fadeOut').and.callFake(done => done());
          jasmineCore.spyOn(view, '_onDeleteClicked').and.callThrough();
          view.$('.file-delete').click();
          jasmineCore.expect($.ajax).not.toHaveBeenCalled();
          jasmineCore.expect(model.destroy).not.toHaveBeenCalled();
          jasmineCore.expect(view.$el.fadeOut).not.toHaveBeenCalled();
        });
        jasmineCore.it('Undo a pending delete', function () {
          model.set('state', RB.FileAttachmentStates.PENDING_DELETION);
          view = new RB.FileAttachmentThumbnailView({
            canEdit: true,
            model: model,
            renderThumbnail: true,
            reviewRequest: reviewRequest,
            reviewRequestEditor: reviewRequestEditor,
            reviewRequestEditorView: reviewRequestEditorView
          });
          $testsScratch.append(view.$el);
          view.render();
          jasmineCore.spyOn(model, 'url').and.callFake(() => {
            return '/test-file-attachment/';
          });
          jasmineCore.spyOn(RB, 'apiCall').and.callFake(options => options.success());
          jasmineCore.spyOn(view, '_onUndoDeleteClicked').and.callThrough();
          view.$('.file-undo-delete').click();
          jasmineCore.expect(RB.apiCall).toHaveBeenCalled();
          jasmineCore.expect(model.get('state')).toBe(RB.FileAttachmentStates.PUBLISHED);
        });
      });
      jasmineCore.describe('addAction', function () {
        jasmineCore.beforeEach(function () {
          model.id = 123;
          model.attributes.id = 123;
          model.set('loaded', true);
          model.url = '/api/file-attachments/123/';
          view = new RB.FileAttachmentThumbnailView({
            canEdit: true,
            model: model,
            renderThumbnail: true,
            reviewRequest: reviewRequest,
            reviewRequestEditor: reviewRequestEditor,
            reviewRequestEditorView: reviewRequestEditorView
          });
          $testsScratch.append(view.$el);
          view.render();
        });
        jasmineCore.it('After the download action', function () {
          const oldActionsLength = view._$actions.children().length;

          /*
           * The file-download class is on the inner <a> element
           * instead of the <li> element.
           */
          view.addAction('file-download', 'new-action', '<a href="#">New Action</a>');
          const newAction = view.$('li.new-action');
          jasmineCore.expect(newAction.length).toBe(1);
          jasmineCore.expect(newAction.find('a').attr('href')).toBe('#');
          jasmineCore.expect(newAction.find('a').text()).toBe('New Action');
          jasmineCore.expect(newAction.parent().attr('class')).toEqual(view._$actions.attr('class'));
          jasmineCore.expect(view._$actions.children().length).toBe(oldActionsLength + 1);
          jasmineCore.expect(newAction.prev().find('a').attr('class')).toEqual('file-download');
        });
        jasmineCore.it('After the delete action', function () {
          const oldActionsLength = view._$actions.children().length;

          /* The file-delete class is on the <li> element. */
          view.addAction('file-delete', 'new-action', '<a href="#">New Action</a>');
          const newAction = view.$('li.new-action');
          jasmineCore.expect(newAction.length).toBe(1);
          jasmineCore.expect(newAction.find('a').attr('href')).toBe('#');
          jasmineCore.expect(newAction.find('a').text()).toBe('New Action');
          jasmineCore.expect(newAction.parent().attr('class')).toEqual(view._$actions.attr('class'));
          jasmineCore.expect(view._$actions.children().length).toBe(oldActionsLength + 1);
          jasmineCore.expect(newAction.prev().attr('class')).toEqual('file-delete');
        });
        jasmineCore.it('After one that does not exist', function () {
          const oldActionsLength = view._$actions.children().length;
          view.addAction('non-existing-action', 'new-action', '<a href="#">New Action</a>');
          const newAction = view.$('li.new-action');
          jasmineCore.expect(newAction.length).toBe(0);
          jasmineCore.expect(view._$actions.children().length).toBe(oldActionsLength);
        });
        jasmineCore.it('With one that already exists', function () {
          const oldActionsLength = view._$actions.children().length;
          view.addAction('file-delete', 'new-action', '<a href="#">New Action</a>');
          let newAction = view.$('li.new-action');
          jasmineCore.expect(newAction.length).toBe(1);
          jasmineCore.expect(newAction.find('a').attr('href')).toBe('#');
          jasmineCore.expect(newAction.find('a').text()).toBe('New Action');
          jasmineCore.expect(newAction.parent().attr('class')).toEqual(view._$actions.attr('class'));
          jasmineCore.expect(view._$actions.children().length).toBe(oldActionsLength + 1);
          jasmineCore.expect(newAction.prev().attr('class')).toEqual('file-delete');

          /* Add the action again, with some different content. */
          view.addAction('file-delete', 'new-action', '<a href="link">Changed Action</a>');
          newAction = view.$('li.new-action');
          jasmineCore.expect(newAction.length).toBe(1);
          jasmineCore.expect(newAction.find('a').attr('href')).toBe('link');
          jasmineCore.expect(newAction.find('a').text()).toBe('Changed Action');
          jasmineCore.expect(newAction.parent().attr('class')).toEqual(view._$actions.attr('class'));
          jasmineCore.expect(view._$actions.children().length).toBe(oldActionsLength + 1);
          jasmineCore.expect(newAction.prev().attr('class')).toEqual('file-delete');
        });
        jasmineCore.it('When another thumbnail for the same file exists', function () {
          const view2 = new RB.FileAttachmentThumbnailView({
            canEdit: false,
            model: model,
            renderThumbnail: true,
            reviewRequest: reviewRequest,
            reviewRequestEditor: reviewRequestEditor,
            reviewRequestEditorView: reviewRequestEditorView
          });
          $testsScratch.append(view2.$el);
          view2.render();
          const viewOldActionsLength = view._$actions.children().length;
          const view2OldActionsLength = view2._$actions.children().length;
          view.addAction('file-delete', 'new-action', '<a href="#">New Action</a>');
          const newAction = view.$('li.new-action');
          const newAction2 = view2.$('li.new-action');

          /* Check the first thumbnail. */
          jasmineCore.expect(newAction.length).toBe(1);
          jasmineCore.expect(newAction.find('a').attr('href')).toBe('#');
          jasmineCore.expect(newAction.find('a').text()).toBe('New Action');
          jasmineCore.expect(newAction.parent().attr('class')).toEqual(view._$actions.attr('class'));
          jasmineCore.expect(view._$actions.children().length).toBe(viewOldActionsLength + 1);
          jasmineCore.expect(newAction.prev().attr('class')).toEqual('file-delete');

          /* Check the second thumbnail. The action should not exist here. */
          jasmineCore.expect(newAction2.length).toBe(0);
          jasmineCore.expect(view2._$actions.children().length).toBe(view2OldActionsLength);
        });
      });
    });

    jasmineSuites.suite('rb/views/ReviewDialogView', function () {
      const baseEmptyCommentListPayload = {
        links: {},
        stat: 'ok',
        total_results: 0
      };
      const emptyDiffCommentsPayload = _.defaults({
        diff_comments: []
      }, baseEmptyCommentListPayload);
      const emptyFileAttachmentCommentsPayload = _.defaults({
        file_attachment_comments: []
      }, baseEmptyCommentListPayload);
      const emptyGeneralCommentsPayload = _.defaults({
        general_comments: []
      }, baseEmptyCommentListPayload);
      const emptyScreenshotCommentsPayload = _.defaults({
        screenshot_comments: []
      }, baseEmptyCommentListPayload);
      const baseCommentPayload = {
        id: 1,
        issue_opened: true,
        issue_status: 'opened',
        text: 'My comment'
      };
      const diffCommentPayload = _.defaults({
        filediff: {
          dest_file: 'my-file',
          id: 1,
          source_file: 'my-file',
          source_revision: '1'
        },
        first_line: 10,
        interfilediff: {
          dest_file: 'my-file',
          id: 2,
          source_file: 'my-file',
          source_revision: '2'
        },
        num_lines: 5
      }, baseCommentPayload);
      const fileAttachmentCommentPayload = _.defaults({
        extra_data: {},
        file_attachment: {
          filename: 'file.txt',
          icon_url: 'data:image/gif;base64,',
          id: 10
        },
        link_text: 'my-link-text',
        review_url: '/review-ui/',
        thumbnail_html: '<blink>Boo</blink>'
      }, baseCommentPayload);
      const generalCommentPayload = baseCommentPayload;
      const screenshotCommentPayload = _.defaults({
        h: 40,
        screenshot: {
          caption: 'My caption',
          filename: 'image.png',
          id: 10,
          review_url: '/review-ui/'
        },
        thumbnail_url: 'data:image/gif;base64,',
        w: 30,
        x: 10,
        y: 20
      }, baseCommentPayload);
      const origGeneralCommentsEnabled = RB.EnabledFeatures.generalComments;
      let reviewRequestEditor;
      let review;
      let dlg;
      async function createReviewDialog() {
        const dlg = RB.ReviewDialogView.create({
          container: $testsScratch,
          review: review,
          reviewRequestEditor: reviewRequestEditor
        });
        return new Promise(resolve => {
          dlg.once('loadCommentsDone', () => {
            resolve(dlg);
          });
        });
      }
      jasmineCore.beforeEach(function () {
        const origMove = $.fn.move;
        const reviewRequest = new RB.ReviewRequest({
          summary: 'My Review Request'
        });
        RB.DnDUploader.create();
        reviewRequestEditor = new RB.ReviewRequestEditor({
          reviewRequest: reviewRequest
        });
        review = new RB.Review({
          parentObject: reviewRequest
        });
        jasmineCore.spyOn(review, 'ready').and.resolveTo();

        /*
         * modalBox uses move(... 'fixed') for all positioning, which will
         * cause the box to flash on screen during tests. Override this to
         * disallow fixed.
         */
        jasmineCore.spyOn($.fn, 'move').and.callFake(function (x, y, pos) {
          if (pos === 'fixed') {
            pos = 'absolute';
          }
          return origMove.call(this, x, y, pos);
        });

        /* Prevent these from being called. */
        jasmineCore.spyOn(RB.DiffFragmentQueueView.prototype, 'queueLoad');
        jasmineCore.spyOn(RB.DiffFragmentQueueView.prototype, 'loadFragments');

        /* By default, general comments should be enabled. */
        RB.EnabledFeatures.generalComments = true;
      });
      jasmineCore.afterEach(function () {
        RB.DnDUploader.instance = null;
        RB.ReviewDialogView.instance = null;
        RB.EnabledFeatures.generalComments = origGeneralCommentsEnabled;
      });
      jasmineCore.describe('Class methods', function () {
        jasmineCore.describe('create', function () {
          jasmineCore.it('Without a review', function () {
            jasmineCore.expect(() => RB.ReviewDialogView.create({
              container: $testsScratch,
              reviewRequestEditor: reviewRequestEditor
            })).toThrow();
            jasmineCore.expect(RB.ReviewDialogView.instance).toBeFalsy();
            jasmineCore.expect($testsScratch.children().length).toBe(0);
          });
          jasmineCore.it('With a review', async function () {
            dlg = await createReviewDialog();
            jasmineCore.expect(dlg).toBeTruthy();
            jasmineCore.expect(RB.ReviewDialogView.instance).toBe(dlg);

            /* One for the dialog, one for the background box. */
            jasmineCore.expect($testsScratch.children().length).toBe(2);
          });
          jasmineCore.it('With existing instance', async function () {
            dlg = await createReviewDialog();
            try {
              await createReviewDialog();
              jasmineCore.fail('Expected createReviewDialog to throw');
            } catch {}
            jasmineCore.expect(RB.ReviewDialogView.instance).toBe(dlg);
            jasmineCore.expect($testsScratch.children().length).toBe(2);
          });
        });
      });
      jasmineCore.describe('Instances', function () {
        jasmineCore.describe('Methods', function () {
          jasmineCore.it('close', async function () {
            dlg = await createReviewDialog();
            jasmineCore.expect($testsScratch.children().length).toBe(2);
            dlg.close();
            jasmineCore.expect($testsScratch.children().length).toBe(0);
            jasmineCore.expect(RB.ReviewDialogView.instance).toBe(null);
          });
        });
        jasmineCore.describe('Loading', function () {
          jasmineCore.it('With new review', async function () {
            jasmineCore.expect(review.isNew()).toBe(true);
            dlg = await createReviewDialog();
            jasmineCore.expect(dlg._bodyTopView.$editor.text()).toBe('');
            jasmineCore.expect(dlg._bodyBottomView.$editor.text()).toBe('');
            jasmineCore.expect(dlg._bodyBottomView.$el.is(':visible')).toBe(false);
            jasmineCore.expect(dlg._$shipIt.prop('checked')).toBe(false);
            jasmineCore.expect(dlg._$spinner).toBe(null);
          });
          jasmineCore.describe('With body and top text', function () {
            const bodyTopText = 'My body top';
            const bodyBottomText = 'My body bottom';
            jasmineCore.beforeEach(function () {
              review.set({
                bodyBottom: bodyBottomText,
                bodyTop: bodyTopText,
                loaded: true
              });
            });
            jasmineCore.it('Clearing body bottom hides footer', async function () {
              dlg = await createReviewDialog();
              jasmineCore.expect(dlg._bodyBottomView.$editor.text()).toBe(bodyBottomText);
              jasmineCore.expect(dlg._bodyBottomView.$el.is(':visible')).toBe(true);
              review.set('bodyBottom', '');
              jasmineCore.expect(dlg._bodyBottomView.$el.is(':visible')).toBe(false);
            });
          });
          jasmineCore.describe('With existing review', function () {
            const bodyTopText = 'My body top';
            const bodyBottomText = 'My body bottom';
            const shipIt = true;
            let fileAttachmentCommentsPayload;
            let generalCommentsPayload;
            let diffCommentsPayload;
            let screenshotCommentsPayload;
            let commentView;
            let ajaxData;
            jasmineCore.beforeEach(function () {
              review.set({
                bodyBottom: bodyBottomText,
                bodyTop: bodyTopText,
                id: 42,
                links: {
                  diff_comments: {
                    href: '/diff-comments/'
                  },
                  file_attachment_comments: {
                    href: '/file-attachment-comments/'
                  },
                  general_comments: {
                    href: '/general-comments/'
                  },
                  screenshot_comments: {
                    href: '/screenshot-comments/'
                  },
                  self: {
                    href: '/reviews/42/'
                  }
                },
                loaded: true,
                shipIt: shipIt
              });
              diffCommentsPayload = _.clone(emptyDiffCommentsPayload);
              screenshotCommentsPayload = _.clone(emptyScreenshotCommentsPayload);
              fileAttachmentCommentsPayload = _.clone(emptyFileAttachmentCommentsPayload);
              generalCommentsPayload = _.clone(emptyGeneralCommentsPayload);
              jasmineCore.spyOn($, 'ajax').and.callFake(options => {
                if (options.type === 'DELETE') {
                  options.success({});
                } else if (options.url === '/file-attachment-comments/') {
                  options.success(fileAttachmentCommentsPayload);
                } else if (options.url === '/diff-comments/') {
                  options.success(diffCommentsPayload);
                } else if (options.url === '/screenshot-comments/') {
                  options.success(screenshotCommentsPayload);
                } else if (options.url === '/general-comments/') {
                  options.success(generalCommentsPayload);
                }
              });
            });
            jasmineCore.describe('Review properties', function () {
              function testLoadReview() {
                return new Promise(resolve => {
                  dlg = RB.ReviewDialogView.create({
                    container: $testsScratch,
                    review: review,
                    reviewRequestEditor: reviewRequestEditor
                  });
                  dlg.on('loadCommentsDone', () => {
                    jasmineCore.expect(dlg._bodyTopView.$editor.text()).toBe(bodyTopText);
                    jasmineCore.expect(dlg._bodyBottomView.$editor.text()).toBe(bodyBottomText);
                    jasmineCore.expect(dlg._bodyBottomView.$el.is(':visible')).toBe(true);
                    jasmineCore.expect(dlg._$shipIt.prop('checked')).toBe(shipIt);
                    jasmineCore.expect(dlg.$('.review-comments .draft').length).toBe(2);
                    jasmineCore.expect(dlg._$spinner).toBe(null);
                    resolve();
                  });
                });
              }
              jasmineCore.it('With defaultUseRichText=true', async function () {
                RB.UserSession.instance.set('defaultUseRichText', true);
                await testLoadReview();
                jasmineCore.expect(review.ready.calls.argsFor(0)[0].data).toEqual({
                  'force-text-type': 'html',
                  'include-text-types': 'raw,markdown'
                });
              });
              jasmineCore.it('With defaultUseRichText=false', async function () {
                RB.UserSession.instance.set('defaultUseRichText', false);
                await testLoadReview();
                jasmineCore.expect(review.ready.calls.argsFor(0)[0].data).toEqual({
                  'force-text-type': 'html',
                  'include-text-types': 'raw'
                });
              });
            });
            jasmineCore.describe('General comments', function () {
              jasmineCore.it('Disabled', async function () {
                RB.EnabledFeatures.generalComments = false;
                dlg = await createReviewDialog();
                const $button = dlg._$buttons.find('input[value="Add General Comment"]');
                jasmineCore.expect($button.length).toBe(0);
                jasmineCore.expect($.ajax).toHaveBeenCalled();
                jasmineCore.expect($.ajax.calls.argsFor(0)[0].url).not.toBe('/general-comments/');
                jasmineCore.expect(dlg._commentViews.length).toBe(0);
              });
              jasmineCore.describe('Enabled', function () {
                async function testLoadGeneralComments() {
                  generalCommentsPayload.total_results = 1;
                  generalCommentsPayload.general_comments = [generalCommentPayload];
                  dlg = await createReviewDialog();
                  const $button = dlg._$buttons.find('button:first');
                  jasmineCore.expect($button.length).toBe(1);
                  jasmineCore.expect($button.text()).toBe('Add General Comment');
                  jasmineCore.expect($.ajax).toHaveBeenCalled();
                  jasmineCore.expect($.ajax.calls.argsFor(0)[0].url).toBe('/general-comments/');
                  ajaxData = $.ajax.calls.argsFor(0)[0].data;
                  jasmineCore.expect(dlg._commentViews.length).toBe(1);
                  commentView = dlg._commentViews[0];
                  jasmineCore.expect(commentView.$editor.text()).toBe(generalCommentPayload.text);
                  jasmineCore.expect(commentView.$issueOpened.prop('checked')).toBe(generalCommentPayload.issue_opened);
                  jasmineCore.expect(dlg._bodyBottomView.$el.is(':visible')).toBe(true);
                  jasmineCore.expect(dlg._$spinner).toBe(null);
                }
                jasmineCore.it('With defaultUseRichText=true', async function () {
                  RB.UserSession.instance.set('defaultUseRichText', true);
                  await testLoadGeneralComments();
                  jasmineCore.expect(ajaxData).toEqual({
                    'api_format': 'json',
                    'force-text-type': 'html',
                    'include-text-types': 'raw,markdown',
                    'max-results': 50
                  });
                });
                jasmineCore.it('With defaultUseRichText=false', async function () {
                  RB.UserSession.instance.set('defaultUseRichText', false);
                  await testLoadGeneralComments();
                  jasmineCore.expect(ajaxData).toEqual({
                    'api_format': 'json',
                    'force-text-type': 'html',
                    'include-text-types': 'raw',
                    'max-results': 50
                  });
                });
                jasmineCore.it('Deleting comment', async function () {
                  jasmineCore.spyOn(window, 'confirm').and.returnValue(true);
                  await testLoadGeneralComments();
                  jasmineCore.expect(dlg._generalCommentsCollection.length).toBe(1);
                  jasmineCore.spyOn(dlg._commentViews[0].$el, 'fadeOut').and.callFake(opts => opts.complete());
                  const caughtEvent = new Promise(resolve => {
                    dlg._generalCommentsCollection.at(0).once('destroyed', () => resolve());
                  });
                  dlg.$('.delete-comment').click();
                  await caughtEvent;
                  jasmineCore.expect(dlg._generalCommentsCollection.length).toBe(0);
                });
                jasmineCore.it('Deleting comment and cancelling', async function () {
                  jasmineCore.spyOn(window, 'confirm').and.returnValue(false);
                  await testLoadGeneralComments();
                  jasmineCore.expect(dlg._generalCommentsCollection.length).toBe(1);
                  dlg.$('.delete-comment').click();
                  jasmineCore.expect(dlg._generalCommentsCollection.length).toBe(1);
                });
              });
            });
            jasmineCore.describe('Diff comments', function () {
              async function testLoadDiffComments() {
                const diffQueueProto = RB.DiffFragmentQueueView.prototype;
                diffCommentsPayload.total_results = 1;
                diffCommentsPayload.diff_comments = [diffCommentPayload];
                dlg = await createReviewDialog();
                jasmineCore.expect($.ajax).toHaveBeenCalled();
                jasmineCore.expect($.ajax.calls.argsFor(3)[0].url).toBe('/diff-comments/');
                ajaxData = $.ajax.calls.argsFor(3)[0].data;
                jasmineCore.expect(diffQueueProto.queueLoad.calls.count()).toBe(1);
                jasmineCore.expect(diffQueueProto.loadFragments).toHaveBeenCalled();
                jasmineCore.expect(dlg._commentViews.length).toBe(1);
                commentView = dlg._commentViews[0];
                jasmineCore.expect(commentView.$editor.text()).toBe(diffCommentPayload.text);
                jasmineCore.expect(commentView.$issueOpened.prop('checked')).toBe(diffCommentPayload.issue_opened);
                jasmineCore.expect(dlg._bodyBottomView.$el.is(':visible')).toBe(true);
                jasmineCore.expect(dlg._$spinner).toBe(null);
              }
              jasmineCore.it('With defaultUseRichText=true', async function () {
                RB.UserSession.instance.set('defaultUseRichText', true);
                await testLoadDiffComments();
                jasmineCore.expect(ajaxData).toEqual({
                  'api_format': 'json',
                  'expand': 'filediff,interfilediff',
                  'force-text-type': 'html',
                  'include-text-types': 'raw,markdown',
                  'max-results': 50,
                  'order-by': 'filediff,first_line'
                });
              });
              jasmineCore.it('With defaultUseRichText=false', async function () {
                RB.UserSession.instance.set('defaultUseRichText', false);
                await testLoadDiffComments();
                jasmineCore.expect(ajaxData).toEqual({
                  'api_format': 'json',
                  'expand': 'filediff,interfilediff',
                  'force-text-type': 'html',
                  'include-text-types': 'raw',
                  'max-results': 50,
                  'order-by': 'filediff,first_line'
                });
              });
              jasmineCore.it('Deleting comment', async function () {
                jasmineCore.spyOn(window, 'confirm').and.returnValue(true);
                await testLoadDiffComments();
                jasmineCore.expect(dlg._diffCommentsCollection.length).toBe(1);
                jasmineCore.spyOn(dlg._commentViews[0].$el, 'fadeOut').and.callFake(opts => opts.complete());
                const caughtEvent = new Promise(resolve => {
                  dlg._diffCommentsCollection.at(0).once('destroyed', () => resolve());
                });
                dlg.$('.delete-comment').click();
                await caughtEvent;
                jasmineCore.expect(dlg._diffCommentsCollection.length).toBe(0);
              });
              jasmineCore.it('Deleting comment and cancelling', async function () {
                jasmineCore.spyOn(window, 'confirm').and.returnValue(false);
                await testLoadDiffComments();
                jasmineCore.expect(dlg._diffCommentsCollection.length).toBe(1);
                dlg.$('.delete-comment').click();
                jasmineCore.expect(dlg._diffCommentsCollection.length).toBe(1);
              });
            });
            jasmineCore.describe('File attachment comments', function () {
              async function testLoadFileAttachmentComments() {
                fileAttachmentCommentsPayload.total_results = 1;
                fileAttachmentCommentsPayload.file_attachment_comments = [fileAttachmentCommentPayload];
                dlg = await createReviewDialog();
                jasmineCore.expect($.ajax).toHaveBeenCalled();
                jasmineCore.expect($.ajax.calls.argsFor(2)[0].url).toBe('/file-attachment-comments/');
                ajaxData = $.ajax.calls.argsFor(2)[0].data;
                jasmineCore.expect(dlg._commentViews.length).toBe(1);
                commentView = dlg._commentViews[0];
                jasmineCore.expect(commentView.$editor.text()).toBe(fileAttachmentCommentPayload.text);
                jasmineCore.expect(commentView.$issueOpened.prop('checked')).toBe(fileAttachmentCommentPayload.issue_opened);
                jasmineCore.expect(commentView.$('.rb-c-review-comment-thumbnail__header').attr('href')).toBe(fileAttachmentCommentPayload.review_url);
                jasmineCore.expect(commentView.$('.rb-c-review-comment-thumbnail__name').text()).toBe(fileAttachmentCommentPayload.link_text);
                jasmineCore.expect(commentView.$('.rb-c-review-comment-thumbnail__content').html()).toBe(fileAttachmentCommentPayload.thumbnail_html);
                jasmineCore.expect(dlg._bodyBottomView.$el.is(':visible')).toBe(true);
                jasmineCore.expect(dlg._$spinner).toBe(null);
              }
              jasmineCore.it('With defaultUseRichText=true', async function () {
                RB.UserSession.instance.set('defaultUseRichText', true);
                await testLoadFileAttachmentComments();
                jasmineCore.expect(ajaxData).toEqual({
                  'api_format': 'json',
                  'expand': 'diff_against_file_attachment,' + 'file_attachment',
                  'force-text-type': 'html',
                  'include-text-types': 'raw,markdown',
                  'max-results': 50
                });
              });
              jasmineCore.it('With defaultUseRichText=false', async function () {
                RB.UserSession.instance.set('defaultUseRichText', false);
                await testLoadFileAttachmentComments();
                jasmineCore.expect(ajaxData).toEqual({
                  'api_format': 'json',
                  'expand': 'diff_against_file_attachment,' + 'file_attachment',
                  'force-text-type': 'html',
                  'include-text-types': 'raw',
                  'max-results': 50
                });
              });
              jasmineCore.it('Deleting comment', async function () {
                jasmineCore.spyOn(window, 'confirm').and.returnValue(true);
                await testLoadFileAttachmentComments();
                jasmineCore.expect(dlg._fileAttachmentCommentsCollection.length).toBe(1);
                jasmineCore.spyOn(dlg._commentViews[0].$el, 'fadeOut').and.callFake(opts => opts.complete());
                const caughtEvent = new Promise(resolve => {
                  dlg._fileAttachmentCommentsCollection.at(0).once('destroyed', () => resolve());
                });
                dlg.$('.delete-comment').click();
                await caughtEvent;
                jasmineCore.expect(dlg._fileAttachmentCommentsCollection.length).toBe(0);
              });
              jasmineCore.it('Deleting comment and cancelling', async function () {
                jasmineCore.spyOn(window, 'confirm').and.returnValue(false);
                await testLoadFileAttachmentComments();
                jasmineCore.expect(dlg._fileAttachmentCommentsCollection.length).toBe(1);
                dlg.$('.delete-comment').click();
                jasmineCore.expect(dlg._fileAttachmentCommentsCollection.length).toBe(1);
              });
            });
            jasmineCore.describe('Screenshot comments', function () {
              async function testLoadScreenshotComments() {
                screenshotCommentsPayload.total_results = 1;
                screenshotCommentsPayload.screenshot_comments = [screenshotCommentPayload];
                dlg = await createReviewDialog();
                jasmineCore.expect($.ajax).toHaveBeenCalled();
                jasmineCore.expect($.ajax.calls.argsFor(1)[0].url).toBe('/screenshot-comments/');
                ajaxData = $.ajax.calls.argsFor(1)[0].data;
                jasmineCore.expect(dlg._commentViews.length).toBe(1);
                commentView = dlg._commentViews[0];
                jasmineCore.expect(commentView.$editor.text()).toBe(screenshotCommentPayload.text);
                jasmineCore.expect(commentView.$issueOpened.prop('checked')).toBe(screenshotCommentPayload.issue_opened);
                const $img = commentView.$('img');
                jasmineCore.expect($img.attr('src')).toBe(screenshotCommentPayload.thumbnail_url);
                jasmineCore.expect($img.attr('width')).toBe(screenshotCommentPayload.w.toString());
                jasmineCore.expect($img.attr('height')).toBe(screenshotCommentPayload.h.toString());
                jasmineCore.expect($img.attr('alt')).toBe(screenshotCommentPayload.screenshot.caption);
                jasmineCore.expect(commentView.$('.rb-c-review-comment-thumbnail__header').attr('href')).toBe(screenshotCommentPayload.screenshot.review_url);
                jasmineCore.expect(commentView.$('.rb-c-review-comment-thumbnail__name').text()).toBe(screenshotCommentPayload.screenshot.caption);
                jasmineCore.expect(dlg._bodyBottomView.$el.is(':visible')).toBe(true);
                jasmineCore.expect(dlg._$spinner).toBe(null);
              }
              jasmineCore.it('With defaultUseRichText=true', async function () {
                RB.UserSession.instance.set('defaultUseRichText', true);
                await testLoadScreenshotComments();
                jasmineCore.expect(ajaxData).toEqual({
                  'api_format': 'json',
                  'expand': 'screenshot',
                  'force-text-type': 'html',
                  'include-text-types': 'raw,markdown',
                  'max-results': 50
                });
              });
              jasmineCore.it('With defaultUseRichText=false', async function () {
                RB.UserSession.instance.set('defaultUseRichText', false);
                await testLoadScreenshotComments();
                jasmineCore.expect(ajaxData).toEqual({
                  'api_format': 'json',
                  'expand': 'screenshot',
                  'force-text-type': 'html',
                  'include-text-types': 'raw',
                  'max-results': 50
                });
              });
              jasmineCore.it('Deleting comment', async function () {
                jasmineCore.spyOn(window, 'confirm').and.returnValue(true);
                await testLoadScreenshotComments();
                jasmineCore.expect(dlg._screenshotCommentsCollection.length).toBe(1);
                jasmineCore.spyOn(dlg._commentViews[0].$el, 'fadeOut').and.callFake(opts => opts.complete());
                const caughtEvent = new Promise(resolve => {
                  dlg._screenshotCommentsCollection.at(0).once('destroyed', () => resolve());
                });
                dlg.$('.delete-comment').click();
                await caughtEvent;
                jasmineCore.expect(dlg._screenshotCommentsCollection.length).toBe(0);
              });
              jasmineCore.it('Deleting comment and cancelling', async function () {
                jasmineCore.spyOn(window, 'confirm').and.returnValue(false);
                await testLoadScreenshotComments();
                jasmineCore.expect(dlg._screenshotCommentsCollection.length).toBe(1);
                dlg.$('.delete-comment').click();
                jasmineCore.expect(dlg._screenshotCommentsCollection.length).toBe(1);
              });
            });
          });
        });
        jasmineCore.describe('Saving', function () {
          let fileAttachmentCommentsPayload;
          let generalCommentsPayload;
          let diffCommentsPayload;
          let screenshotCommentsPayload;
          let commentView;
          let comment;
          async function testSaveComment(richText) {
            const newCommentText = 'New comment text';
            dlg = await createReviewDialog();
            jasmineCore.expect(dlg._commentViews.length).toBe(1);
            commentView = dlg._commentViews[0];
            comment = commentView.model;
            jasmineCore.spyOn(comment, 'save').and.callFake(() => {
              comment.trigger('sync');
              return Promise.resolve();
            });

            /* Set some new state for the comment. */
            commentView.inlineEditorView.startEdit();
            commentView.inlineEditorView.setValue(newCommentText);
            commentView.textEditor.setRichText(richText);
            await commentView.save();
            jasmineCore.expect(comment.save).toHaveBeenCalled();
            jasmineCore.expect(comment.get('text')).toBe(newCommentText);
            jasmineCore.expect(comment.get('richText')).toBe(richText);
          }
          async function testSaveCommentPreventsXSS() {
            const newCommentText = '"><script>window.rbTestFoundXSS = true;</script>';
            delete window.rbTestFoundXSS;
            dlg = await createReviewDialog();
            jasmineCore.expect(dlg._commentViews.length).toBe(1);
            commentView = dlg._commentViews[0];
            comment = commentView.model;
            jasmineCore.spyOn(comment, 'save').and.callFake(() => {
              comment.trigger('sync');
              return Promise.resolve();
            });

            /* Set some new state for the comment. */
            commentView.inlineEditorView.startEdit();
            commentView.inlineEditorView.setValue(newCommentText);
            commentView.textEditor.setRichText(true);
            await commentView.save();
            jasmineCore.expect(comment.save).toHaveBeenCalled();
            jasmineCore.expect(comment.get('text')).toBe(newCommentText);
            jasmineCore.expect(window.rbTestFoundXSS).toBe(undefined);
          }
          jasmineCore.beforeEach(function () {
            review.set({
              id: 42,
              links: {
                diff_comments: {
                  href: '/diff-comments/'
                },
                file_attachment_comments: {
                  href: '/file-attachment-comments/'
                },
                general_comments: {
                  href: '/general-comments/'
                },
                screenshot_comments: {
                  href: '/screenshot-comments/'
                }
              },
              loaded: true
            });
            diffCommentsPayload = _.clone(emptyDiffCommentsPayload);
            screenshotCommentsPayload = _.clone(emptyScreenshotCommentsPayload);
            fileAttachmentCommentsPayload = _.clone(emptyFileAttachmentCommentsPayload);
            generalCommentsPayload = _.clone(emptyGeneralCommentsPayload);
            jasmineCore.spyOn(review, 'save').and.resolveTo();
            jasmineCore.spyOn($, 'ajax').and.callFake(options => {
              if (options.url === '/file-attachment-comments/') {
                options.success(fileAttachmentCommentsPayload);
              } else if (options.url === '/diff-comments/') {
                options.success(diffCommentsPayload);
              } else if (options.url === '/screenshot-comments/') {
                options.success(screenshotCommentsPayload);
              } else if (options.url === '/general-comments/') {
                options.success(generalCommentsPayload);
              }
            });
          });
          jasmineCore.describe('Review properties', function () {
            function testSelfXSS(bodyView, attrName) {
              const text = '"><script>window.rbTestFoundXSS = true;' + '</script>';
              const editor = bodyView.textEditor;
              delete window.rbTestFoundXSS;
              bodyView.openEditor();
              editor.setText(text);
              editor.setRichText(true);
              bodyView.save();
              jasmineCore.expect(editor.getText()).toBe(text);
              jasmineCore.expect(review.save).toHaveBeenCalled();
              jasmineCore.expect(review.get(attrName)).toBe(text);
              jasmineCore.expect(window.rbTestFoundXSS).toBe(undefined);
            }
            jasmineCore.beforeEach(async function () {
              dlg = await createReviewDialog();
            });
            jasmineCore.describe('Body Top', function () {
              function runTest(richText) {
                const text = 'My new text';
                const bodyTopEditor = dlg._bodyTopView.textEditor;
                dlg._bodyTopView.openEditor();
                bodyTopEditor.setText(text);
                bodyTopEditor.setRichText(richText);
                dlg._bodyTopView.save();
                jasmineCore.expect(bodyTopEditor.getText()).toBe(text);
                jasmineCore.expect(review.save).toHaveBeenCalled();
                jasmineCore.expect(review.get('bodyTop')).toBe(text);
                jasmineCore.expect(review.get('bodyTopRichText')).toBe(richText);
              }
              jasmineCore.it('For Markdown', function () {
                runTest(true);
              });
              jasmineCore.it('For plain text', function () {
                runTest(false);
              });
              jasmineCore.it('Prevents Self-XSS', function () {
                testSelfXSS(dlg._bodyTopView, 'bodyTop');
              });
            });
            jasmineCore.describe('Body Bottom', function () {
              function runTest(richText) {
                const text = 'My new text';
                const bodyBottomEditor = dlg._bodyBottomView.textEditor;
                dlg._bodyBottomView.openEditor();
                bodyBottomEditor.setText(text);
                bodyBottomEditor.setRichText(richText);
                dlg._bodyBottomView.save();
                jasmineCore.expect(bodyBottomEditor.getText()).toBe(text);
                jasmineCore.expect(review.save).toHaveBeenCalled();
                jasmineCore.expect(review.get('bodyBottom')).toBe(text);
                jasmineCore.expect(review.get('bodyBottomRichText')).toBe(richText);
              }
              jasmineCore.it('For Markdown', function () {
                runTest(true);
              });
              jasmineCore.it('For plain text', function () {
                runTest(false);
              });
              jasmineCore.it('Prevents Self-XSS', function () {
                testSelfXSS(dlg._bodyBottomView, 'bodyBottom');
              });
            });
            jasmineCore.describe('Ship It', function () {
              async function runTest(shipIt) {
                dlg._$shipIt.prop('checked', shipIt);
                jasmineCore.spyOn(RB, 'navigateTo');
                await dlg._saveReview();
                jasmineCore.expect(dlg._$shipIt.prop('checked')).toBe(shipIt);
              }
              jasmineCore.it('Checked', async function () {
                await runTest(true);
              });
              jasmineCore.it('Unchecked', async function () {
                await runTest(false);
              });
            });
          });
          jasmineCore.describe('Diff comments', function () {
            jasmineCore.beforeEach(function () {
              diffCommentsPayload.total_results = 1;
              diffCommentsPayload.diff_comments = [diffCommentPayload];
            });
            jasmineCore.it('For Markdown', async function () {
              await testSaveComment(true);
            });
            jasmineCore.it('For plain text', async function () {
              await testSaveComment(false);
            });
            jasmineCore.it('Prevents Self-XSS', async function () {
              await testSaveCommentPreventsXSS();
            });
          });
          jasmineCore.describe('File attachment comments', function () {
            jasmineCore.beforeEach(function () {
              fileAttachmentCommentsPayload.total_results = 1;
              fileAttachmentCommentsPayload.file_attachment_comments = [fileAttachmentCommentPayload];
            });
            jasmineCore.it('For Markdown', async function () {
              await testSaveComment(true);
            });
            jasmineCore.it('For plain text', async function () {
              await testSaveComment(false);
            });
            jasmineCore.it('Prevents Self-XSS', async function () {
              await testSaveCommentPreventsXSS();
            });
          });
          jasmineCore.describe('General comments', function () {
            jasmineCore.beforeEach(function () {
              generalCommentsPayload.total_results = 1;
              generalCommentsPayload.general_comments = [generalCommentPayload];
            });
            jasmineCore.it('For Markdown', async function () {
              await testSaveComment(true);
            });
            jasmineCore.it('For plain text', async function () {
              await testSaveComment(false);
            });
          });
          jasmineCore.describe('Screenshot comments', function () {
            jasmineCore.beforeEach(function () {
              screenshotCommentsPayload.total_results = 1;
              screenshotCommentsPayload.screenshot_comments = [screenshotCommentPayload];
            });
            jasmineCore.it('For Markdown', async function () {
              await testSaveComment(true);
            });
            jasmineCore.it('For plain text', async function () {
              await testSaveComment(false);
            });
            jasmineCore.it('Prevents Self-XSS', async function () {
              await testSaveCommentPreventsXSS();
            });
          });
        });
      });
    });

    jasmineSuites.suite('rb/views/ReviewRequestEditorView', function () {
      const template = `<div>
 <div class="rb-c-unified-banner" id="unified-banner">
  <div class="rb-c-unified-banner__mode-selector"></div>
  <pre id="field_change_description" class="field field-text-area"
       data-field-id="field_change_description"></pre>
 </div>
 <div id="review-request-banners"></div>
 <div id="review-request-warning"></div>
 <div class="actions">
  <a href="#" id="discard-review-request-action"></a>
  <a href="#" id="submit-review-request-action"></a>
  <a href="#" id="delete-review-request-action"></a>
 </div>
 <div class="review-request">
  <div class="review-request-section review-request-summary">
   <div class="rb-c-review-request-fieldset">
    <div class="rb-c-review-request-field">
     <label class="rb-c-review-request-field__label">Summary</label>
     <div class="rb-c-review-request-field__value">
      <span id="field_summary"
            data-field-id="summary"
            class="field editable"></span>
     </div>
    </div>
   </div>
  </div>

  <div id="review-request-details">
   <div class="rb-c-review-request-fieldset">
    <div class="rb-c-review-request-field">
     <div class="rb-c-review-request-field__value">
      <span id="field_branch"
            data-field-id="branch"
            class="field editable"></span>
     </div>
     <div class="rb-c-review-request-field__value">
      <span id="field_submitter"
            data-field-id="submitter"
            class="field editable"></span>
     </div>
     <div class="rb-c-review-request-field__value">
      <span id="field_bugs_closed"
            data-field-id="bugs_closed"
            class="field editable comma-editable"></span>
     </div>
     <div class="rb-c-review-request-field__value">
      <span id="field_depends_on"
            data-field-id="depends_on"
            class="field editable comma-editable"></span>
     </div>
     <div class="rb-c-review-request-field__value">
      <span id="field_target_groups"
            data-field-id="target_groups"
            class="field editable comma-editable"></span>
     </div>
     <div class="rb-c-review-request-field__value">
      <span id="field_target_people"
            data-field-id="target_people"
            class="field editable"></span>
     </div>
    </div>
   </div>
  </div>

  <div id="review-request-main">
   <div class="rb-c-review-request-fieldset">
    <div class="review-request-section">
     <div class="rb-c-review-request-field">
      <div class="rb-c-review-request-field__value">
       <pre id="field_description"
            data-field-id="description"
            class="field field-text-area editable"></pre>
      </div>
     </div>
    </div>
    <div class="review-request-section">
     <div class="rb-c-review-request-field">
      <div class="rb-c-review-request-field__value">
       <pre id="field_testing_done"
            data-field-id="testing_done"
            class="field field-text-area editable"></pre>
      </div>
     </div>
    </div>
    <div class="review-request-section">
     <div class="rb-c-review-request-field">
      <div class="rb-c-review-request-field__value">
       <pre id="field_my_custom"
            data-field-id="my_custom"
            class="field editable"></pre>
       <pre id="field_my_rich_text_custom"
            data-field-id="my_rich_text_custom"
            class="field field-text-area editable rich-text"
            data-allow-markdown="True"></pre>
       <pre id="field_text"
            data-field-id="text"
            class="field field-text-area editable"
            data-allow-markdown="True"></pre>
       <input id="field_checkbox"
              data-field-id="checkbox"
              class="field"
              type="checkbox">
      </div>
     </div>
    </div>
   </div>
  </div>
  <div id="review-request-extra">
   <div>
    <div id="file-list"><br></div>
   </div>
   <div>
    <div id="screenshot-thumbnails"><br></div>
   </div>
  </div>
 </div>
</div>`;
      const screenshotThumbnailTemplate = _.template(`<div class="screenshot-container" data-screenshot-id="<%= id %>">
 <div class="screenshot-caption">
  <a class="edit"></a>
 </div>
 <a class="delete">X</a>
'</div>`);
      let reviewRequest;
      let editor;
      let view;
      let $filesContainer;
      let $screenshotsContainer;
      jasmineCore.beforeEach(function () {
        RB.DnDUploader.create();
        reviewRequest = new RB.ReviewRequest({
          id: 123,
          'public': true,
          state: RB.ReviewRequest.PENDING
        });
        editor = new RB.ReviewRequestEditor({
          commentIssueManager: new RB.CommentIssueManager(),
          mutableByUser: true,
          reviewRequest: reviewRequest,
          statusMutableByUser: true
        });
        const $el = $(template).appendTo($testsScratch);
        view = new RB.ReviewRequestEditorView({
          el: $el,
          model: editor
        });
        view.addFieldView(new RB.ReviewRequestFields.SummaryFieldView({
          el: $el.find('#field_summary'),
          fieldID: 'summary',
          model: editor
        }));
        view.addFieldView(new RB.ReviewRequestFields.BranchFieldView({
          el: $el.find('#field_branch'),
          fieldID: 'branch',
          model: editor
        }));
        view.addFieldView(new RB.ReviewRequestFields.OwnerFieldView({
          el: $el.find('#field_submitter'),
          fieldID: 'submitter',
          model: editor
        }));
        view.addFieldView(new RB.ReviewRequestFields.BugsFieldView({
          el: $el.find('#field_bugs_closed'),
          fieldID: 'bugs_closed',
          model: editor
        }));
        view.addFieldView(new RB.ReviewRequestFields.DependsOnFieldView({
          el: $el.find('#field_depends_on'),
          fieldID: 'depends_on',
          model: editor
        }));
        view.addFieldView(new RB.ReviewRequestFields.TargetGroupsFieldView({
          el: $el.find('#field_target_groups'),
          fieldID: 'target_groups',
          model: editor
        }));
        view.addFieldView(new RB.ReviewRequestFields.TargetPeopleFieldView({
          el: $el.find('#field_target_people'),
          fieldID: 'target_people',
          model: editor
        }));
        view.addFieldView(new RB.ReviewRequestFields.DescriptionFieldView({
          el: $el.find('#field_description'),
          fieldID: 'description',
          model: editor
        }));
        view.addFieldView(new RB.ReviewRequestFields.TestingDoneFieldView({
          el: $el.find('#field_testing_done'),
          fieldID: 'testing_done',
          model: editor
        }));
        view.addFieldView(new RB.ReviewRequestFields.TextFieldView({
          el: $el.find('#field_my_custom'),
          fieldID: 'my_custom',
          model: editor
        }));
        view.addFieldView(new RB.ReviewRequestFields.MultilineTextFieldView({
          el: $el.find('#field_my_rich_text_custom'),
          fieldID: 'my_rich_text_custom',
          model: editor
        }));
        view.addFieldView(new RB.ReviewRequestFields.MultilineTextFieldView({
          el: $el.find('#field_text'),
          fieldID: 'text',
          model: editor
        }));
        view.addFieldView(new RB.ReviewRequestFields.CheckboxFieldView({
          el: $el.find('#field_checkbox'),
          fieldID: 'checkbox',
          model: editor
        }));
        jasmineCore.spyOn(reviewRequest.draft, 'ready').and.resolveTo();
        if (RB.EnabledFeatures.unifiedBanner) {
          const pendingReview = reviewRequest.createReview();
          jasmineCore.spyOn(pendingReview, 'ready').and.resolveTo();
          jasmineCore.spyOn(reviewRequest, 'ready').and.resolveTo();
          const banner = new RB.UnifiedBannerView({
            el: $el.find('#unified-banner'),
            model: new RB.UnifiedBanner({
              pendingReview: pendingReview,
              reviewRequest: reviewRequest,
              reviewRequestEditor: editor
            }),
            reviewRequestEditorView: view
          });
          banner.render();
        }
        $filesContainer = $testsScratch.find('#file-list');
        $screenshotsContainer = $testsScratch.find('#screenshot-thumbnails');

        // Don't let the page navigate away.
        jasmineCore.spyOn(RB, 'navigateTo');
      });
      jasmineCore.afterEach(function () {
        RB.DnDUploader.instance = null;
        if (RB.EnabledFeatures.unifiedBanner) {
          RB.UnifiedBannerView.resetInstance();
        }
      });
      jasmineCore.describe('Actions bar', function () {
        jasmineCore.it('ReviewRequestActionHooks', function () {
          const MyExtension = RB.Extension.extend({
            initialize: function () {
              RB.Extension.prototype.initialize.call(this);
              new RB.ReviewRequestActionHook({
                callbacks: {
                  '#my-action': _.bind(function () {
                    this.actionClicked = true;
                  }, this)
                },
                extension: this
              });
            }
          });
          const extension = new MyExtension();

          /*
           * Actions are rendered server-side, not client-side, so we won't
           * get the action added through the hook above.
           */
          const $action = $('<a href="#" id="my-action">').appendTo(view.$('.actions'));
          view.render();
          $action.click();
          jasmineCore.expect(extension.actionClicked).toBe(true);
        });
      });
      jasmineCore.describe('Banners', function () {
        jasmineCore.beforeEach(function () {
          view.render();
        });
        jasmineCore.describe('Draft banner', function () {
          jasmineCore.beforeEach(() => {
            if (RB.EnabledFeatures.unifiedBanner) {
              jasmineCore.pending();
            }
          });
          jasmineCore.describe('Visibility', function () {
            jasmineCore.it('Hidden when saving', function () {
              jasmineCore.expect(view.banner).toBe(null);
              editor.trigger('saving');
              jasmineCore.expect(view.banner).toBe(null);
            });
            jasmineCore.it('Show when saved', function (done) {
              const summaryField = view.getFieldView('summary');
              const summaryEditor = summaryField.inlineEditorView;
              jasmineCore.expect(view.banner).toBe(null);
              jasmineCore.spyOn(reviewRequest.draft, 'ensureCreated').and.resolveTo();
              jasmineCore.spyOn(reviewRequest.draft, 'save').and.resolveTo();
              summaryField.on('fieldSaved', () => {
                jasmineCore.expect(view.banner).not.toBe(null);
                jasmineCore.expect(view.banner.$el.is(':visible')).toBe(true);
                done();
              });
              summaryEditor.startEdit();
              summaryEditor.setValue('New summary');
              summaryEditor.save();
            });
          });
          jasmineCore.describe('Buttons actions', function () {
            jasmineCore.beforeEach(function () {
              reviewRequest.set({
                links: {
                  submitter: {
                    title: 'submitter'
                  }
                }
              });
            });
            jasmineCore.it('Discard Draft', function () {
              view.model.set('hasDraft', true);
              view.showBanner();
              jasmineCore.spyOn(reviewRequest.draft, 'destroy').and.resolveTo();
              $('#btn-draft-discard').click();
              jasmineCore.expect(reviewRequest.draft.destroy).toHaveBeenCalled();
            });
            jasmineCore.it('Discard Review Request', function () {
              reviewRequest.set('public', false);
              view.model.set('hasDraft', true);
              view.showBanner();
              jasmineCore.spyOn(reviewRequest, 'close').and.callFake(options => {
                jasmineCore.expect(options.type).toBe(RB.ReviewRequest.CLOSE_DISCARDED);
                return Promise.resolve();
              });
              $('#btn-review-request-discard').click();
              jasmineCore.expect(reviewRequest.close).toHaveBeenCalled();
            });
            jasmineCore.describe('Publish', function () {
              jasmineCore.beforeEach(function () {
                view.model.set('hasDraft', true);
                jasmineCore.spyOn(editor, 'publishDraft').and.callThrough();
                jasmineCore.spyOn(reviewRequest.draft, 'ensureCreated').and.resolveTo();
                jasmineCore.spyOn(reviewRequest.draft, 'publish').and.resolveTo();

                // Set up some basic state so that we pass validation.
                reviewRequest.draft.set({
                  description: 'foo',
                  links: {
                    submitter: {
                      title: 'submitter'
                    }
                  },
                  summary: 'foo',
                  targetGroups: [{
                    name: 'foo',
                    url: '/groups/foo'
                  }]
                });
              });
              jasmineCore.it('Basic publishing', async function () {
                view.showBanner();
                reviewRequest.draft.publish.and.callFake(() => {
                  jasmineCore.expect(editor.get('publishing')).toBe(true);
                  jasmineCore.expect(editor.publishDraft).toHaveBeenCalled();
                });
                await view.banner._onPublishDraftClicked();
              });
              jasmineCore.it('With submitter changed', async function () {
                reviewRequest.draft.set({
                  links: {
                    submitter: {
                      title: 'submitter2'
                    }
                  }
                });
                view.showBanner();
                jasmineCore.spyOn(window, 'confirm').and.returnValue(true);
                reviewRequest.draft.publish.and.callFake(() => {
                  jasmineCore.expect(editor.get('publishing')).toBe(true);
                  jasmineCore.expect(editor.publishDraft).toHaveBeenCalled();
                  jasmineCore.expect(window.confirm).toHaveBeenCalled();
                });
                await view.banner._onPublishDraftClicked();
              });
              jasmineCore.it('With Send E-Mail turned on', async function () {
                view.model.set('showSendEmail', true);
                view.showBanner();
                reviewRequest.draft.publish.and.callFake(options => {
                  jasmineCore.expect(editor.get('publishing')).toBe(true);
                  jasmineCore.expect(editor.publishDraft).toHaveBeenCalled();
                  jasmineCore.expect(options.trivial).toBe(0);
                });
                await view.banner._onPublishDraftClicked();
              });
              jasmineCore.it('With Send E-Mail turned off', async function () {
                view.model.set('showSendEmail', true);
                view.showBanner();
                $('.send-email').prop('checked', false);
                reviewRequest.draft.publish.and.callFake(options => {
                  jasmineCore.expect(editor.get('publishing')).toBe(true);
                  jasmineCore.expect(editor.publishDraft).toHaveBeenCalled();
                  jasmineCore.expect(options.trivial).toBe(1);
                });
                await view.banner._onPublishDraftClicked();
              });
            });
          });
          jasmineCore.describe('Button states', function () {
            let $buttons;
            jasmineCore.beforeEach(function () {
              view.model.set('hasDraft', true);
              view.showBanner();
              $buttons = view.banner.$buttons;
            });
            jasmineCore.it('Enabled by default', function () {
              jasmineCore.expect($buttons.prop('disabled')).toBe(false);
            });
            jasmineCore.it('Disabled when saving', function () {
              jasmineCore.expect($buttons.prop('disabled')).toBe(false);
              editor.trigger('saving');
              jasmineCore.expect($buttons.prop('disabled')).toBe(true);
            });
            jasmineCore.it('Enabled when saved', function () {
              jasmineCore.expect($buttons.prop('disabled')).toBe(false);
              editor.trigger('saving');
              jasmineCore.expect($buttons.prop('disabled')).toBe(true);
              editor.trigger('saved');
              jasmineCore.expect($buttons.prop('disabled')).toBe(false);
            });
          });
        });
        jasmineCore.describe('Discarded banner', function () {
          jasmineCore.beforeEach(function () {
            reviewRequest.set('state', RB.ReviewRequest.CLOSE_DISCARDED);
          });
          jasmineCore.it('Visibility', function () {
            jasmineCore.expect(view.banner).toBe(null);
            view.showBanner();
            jasmineCore.expect(view.banner).not.toBe(null);
            jasmineCore.expect(view.banner.el.id).toBe('discard-banner');
            jasmineCore.expect(view.banner.$el.is(':visible')).toBe(true);
          });
          jasmineCore.describe('Buttons actions', function () {
            jasmineCore.beforeEach(function () {
              jasmineCore.expect(view.banner).toBe(null);
              view.showBanner();
            });
            jasmineCore.it('Reopen', function () {
              jasmineCore.spyOn(reviewRequest, 'reopen').and.resolveTo();
              $('#btn-review-request-reopen').click();
              jasmineCore.expect(reviewRequest.reopen).toHaveBeenCalled();
            });
          });
          jasmineCore.describe('Close description', function () {
            let fieldEditor;
            let $input;
            jasmineCore.beforeEach(function () {
              view.showBanner();
              fieldEditor = view.banner.field.inlineEditorView;
              $input = fieldEditor.$field;
            });
            function testCloseDescription(testName, richText) {
              jasmineCore.it(testName, function (done) {
                fieldEditor.startEdit();
                const textEditor = fieldEditor.textEditor;
                textEditor.setText('My description');
                textEditor.setRichText(richText);
                $input.triggerHandler('keyup');
                const t = setInterval(() => {
                  if (fieldEditor.isDirty()) {
                    clearInterval(t);
                    jasmineCore.spyOn(reviewRequest, 'close').and.callFake(options => {
                      jasmineCore.expect(options.type).toBe(RB.ReviewRequest.CLOSE_DISCARDED);
                      jasmineCore.expect(options.description).toBe('My description');
                      jasmineCore.expect(options.richText).toBe(richText);
                      return Promise.resolve();
                    });
                    fieldEditor.submit();
                    jasmineCore.expect(reviewRequest.close).toHaveBeenCalled();
                    done();
                  }
                }, 100);
              });
            }
            jasmineCore.describe('Saves', function () {
              testCloseDescription('For Markdown', true);
              testCloseDescription('For plain text', false);
            });
          });
        });
        jasmineCore.describe('Submitted banner', function () {
          jasmineCore.beforeEach(function () {
            reviewRequest.set('state', RB.ReviewRequest.CLOSE_SUBMITTED);
          });
          jasmineCore.it('Visibility', function () {
            jasmineCore.expect(view.banner).toBe(null);
            view.showBanner();
            jasmineCore.expect(view.banner).not.toBe(null);
            jasmineCore.expect(view.banner.el.id).toBe('submitted-banner');
            jasmineCore.expect(view.banner.$el.is(':visible')).toBe(true);
          });
          jasmineCore.describe('Buttons actions', function () {
            jasmineCore.beforeEach(function () {
              jasmineCore.expect(view.banner).toBe(null);
              reviewRequest.set('state', RB.ReviewRequest.CLOSE_SUBMITTED);
              view.showBanner();
            });
            jasmineCore.it('Reopen', function () {
              jasmineCore.spyOn(reviewRequest, 'reopen').and.resolveTo();
              $('#btn-review-request-reopen').click();
              jasmineCore.expect(reviewRequest.reopen).toHaveBeenCalled();
            });
          });
          jasmineCore.describe('Close description', function () {
            let fieldEditor;
            let $input;
            jasmineCore.beforeEach(function () {
              view.showBanner();
              fieldEditor = view.banner.field.inlineEditorView;
              $input = fieldEditor.$field;
            });
            function testCloseDescription(testName, richText) {
              jasmineCore.it(testName, function (done) {
                fieldEditor.startEdit();
                const textEditor = fieldEditor.textEditor;
                textEditor.setText('My description');
                textEditor.setRichText(richText);
                $input.triggerHandler('keyup');
                const t = setInterval(function () {
                  if (fieldEditor.isDirty()) {
                    clearInterval(t);
                    jasmineCore.spyOn(reviewRequest, 'close').and.callFake(options => {
                      jasmineCore.expect(options.type).toBe(RB.ReviewRequest.CLOSE_SUBMITTED);
                      jasmineCore.expect(options.description).toBe('My description');
                      jasmineCore.expect(options.richText).toBe(richText);
                      return Promise.resolve();
                    });
                    fieldEditor.submit();
                    jasmineCore.expect(reviewRequest.close).toHaveBeenCalled();
                    done();
                  }
                }, 100);
              });
            }
            jasmineCore.describe('Saves', function () {
              testCloseDescription('For Markdown', true);
              testCloseDescription('For plain text', false);
            });
          });
        });
      });
      jasmineCore.describe('Fields', function () {
        let saveSpyFunc;
        let fieldName;
        let jsonFieldName;
        let jsonTextTypeFieldName;
        let supportsRichText;
        let useExtraData;
        let fieldView;
        let fieldEditor;
        let $field;
        let $input;
        jasmineCore.beforeEach(function () {
          if (!saveSpyFunc) {
            saveSpyFunc = options => {
              jasmineCore.expect(options.data[jsonFieldName]).toBe('My Value');
              return Promise.resolve();
            };
          }
          jasmineCore.spyOn(reviewRequest.draft, 'save').and.callFake(saveSpyFunc);
          view.render();
        });
        function setupFieldTests(options) {
          jasmineCore.beforeEach(function () {
            fieldName = options.fieldName;
            jsonFieldName = options.jsonFieldName;
            jsonTextTypeFieldName = jsonFieldName === 'text' ? 'text_type' : jsonFieldName + '_text_type';
            supportsRichText = !!options.supportsRichText;
            useExtraData = options.useExtraData;
            fieldView = view.getFieldView(options.fieldID || options.jsonFieldName);
            fieldEditor = fieldView.inlineEditorView;
            $field = view.$(options.selector);
            $input = fieldEditor.$field;
          });
        }
        function hasAutoCompleteTest() {
          jasmineCore.it('Has auto-complete', function () {
            jasmineCore.expect($input.data('uiRbautocomplete')).not.toBe(undefined);
          });
        }
        function hasEditorTest() {
          jasmineCore.it('Has editor', function () {
            jasmineCore.expect(fieldEditor).not.toBe(undefined);
          });
        }
        function runSavingTest(richText, textType, supportsRichTextEV) {
          jasmineCore.beforeEach(function (done) {
            jasmineCore.expect(supportsRichText).toBe(supportsRichTextEV);
            fieldEditor.startEdit();
            if (supportsRichText) {
              jasmineCore.expect($field.hasClass('field-text-area')).toBe(true);
              const textEditor = fieldEditor.textEditor;
              textEditor.setText('My Value');
              textEditor.setRichText(richText);
            } else {
              $input.val('My Value');
            }
            $input.triggerHandler('keyup');
            jasmineCore.expect(fieldEditor.getValue()).toBe('My Value');
            const t = setInterval(() => {
              if (fieldEditor.isDirty()) {
                clearInterval(t);
                done();
              }
            }, 100);
          });
          jasmineCore.it('', function () {
            const expectedData = {};
            const fieldPrefix = useExtraData ? 'extra_data.' : '';
            expectedData[fieldPrefix + jsonFieldName] = 'My Value';
            if (supportsRichText) {
              expectedData[fieldPrefix + jsonTextTypeFieldName] = textType;
              expectedData.force_text_type = 'html';
              expectedData.include_text_types = 'raw';
            }
            jasmineCore.expect(fieldEditor.isDirty()).toBe(true);
            fieldEditor.submit();
            jasmineCore.expect(reviewRequest.draft.save).toHaveBeenCalled();
            jasmineCore.expect(reviewRequest.draft.save.calls.argsFor(0)[0].data).toEqual(expectedData);
          });
        }
        function savingTest() {
          jasmineCore.describe('Saves', function () {
            runSavingTest(undefined, undefined, false);
          });
        }
        function richTextSavingTest() {
          jasmineCore.describe('Saves (rich text)', function () {
            jasmineCore.describe('For Markdown', function () {
              runSavingTest(true, 'markdown', true);
            });
            jasmineCore.describe('For plain text', function () {
              runSavingTest(false, 'plain', true);
            });
          });
        }
        function inlineEditorResizeTests() {
          jasmineCore.it('Propagates resizes', function () {
            jasmineCore.spyOn(fieldView, 'trigger').and.callThrough();
            fieldView.inlineEditorView.textEditor.$el.triggerHandler('resize');
            jasmineCore.expect(fieldView.trigger).toHaveBeenCalledWith('resize');
          });
        }
        function editCountTests() {
          jasmineCore.describe('Edit counts', function () {
            jasmineCore.it('When opened', function () {
              jasmineCore.expect(editor.get('editCount')).toBe(0);
              fieldEditor.startEdit();
              jasmineCore.expect(editor.get('editCount')).toBe(1);
            });
            jasmineCore.it('When canceled', function () {
              fieldEditor.startEdit();
              fieldEditor.cancel();
              jasmineCore.expect(editor.get('editCount')).toBe(0);
            });
            jasmineCore.it('When submitted', function () {
              fieldEditor.startEdit();
              $input.val('My Value').triggerHandler('keyup');
              fieldEditor.submit();
              jasmineCore.expect(editor.get('editCount')).toBe(0);
            });
          });
        }
        function securityTests(options = {}) {
          if (options.supportsRichText) {
            jasmineCore.describe('Security measures', function () {
              jasmineCore.it('No self-XSS when draft field changes', function () {
                let fieldOwner;
                delete window.rbTestFoundXSS;
                if (options.fieldOnReviewRequest) {
                  fieldOwner = reviewRequest;
                } else {
                  fieldOwner = reviewRequest.draft;
                }
                fieldOwner.set(fieldName, '"><script>window.rbTestFoundXSS = true;</script>');
                fieldOwner.trigger('change:' + fieldName);
                fieldOwner.trigger('fieldChange:' + fieldName);
                jasmineCore.expect(window.rbTestFoundXSS).toBe(undefined);
              });
            });
          }
        }
        jasmineCore.describe('Branch', function () {
          setupFieldTests({
            fieldName: 'branch',
            jsonFieldName: 'branch',
            selector: '#field_branch'
          });
          hasEditorTest();
          savingTest();
          editCountTests();
          securityTests();
        });
        jasmineCore.describe('Bugs Closed', function () {
          setupFieldTests({
            fieldName: 'bugsClosed',
            jsonFieldName: 'bugs_closed',
            selector: '#field_bugs_closed'
          });
          hasEditorTest();
          savingTest();
          jasmineCore.describe('Formatting', function () {
            jasmineCore.it('With bugTrackerURL', function () {
              reviewRequest.set('bugTrackerURL', 'http://issues/?id=--bug_id--');
              reviewRequest.draft.set('bugsClosed', [1, 2, 3]);
              editor.trigger('fieldChanged:bugsClosed');
              jasmineCore.expect($field.text()).toBe('1, 2, 3');
              const $links = $field.children('a');
              jasmineCore.expect($links.length).toBe(3);
              let $link = $links.eq(0);
              jasmineCore.expect($link.hasClass('bug')).toBe(true);
              jasmineCore.expect($link.text()).toBe('1');
              jasmineCore.expect($link.attr('href')).toBe('http://issues/?id=1');
              $link = $links.eq(1);
              jasmineCore.expect($link.hasClass('bug')).toBe(true);
              jasmineCore.expect($link.text()).toBe('2');
              jasmineCore.expect($link.attr('href')).toBe('http://issues/?id=2');
              $link = $links.eq(2);
              jasmineCore.expect($link.hasClass('bug')).toBe(true);
              jasmineCore.expect($link.text()).toBe('3');
              jasmineCore.expect($link.attr('href')).toBe('http://issues/?id=3');
            });
            jasmineCore.it('Without bugTrackerURL', function () {
              reviewRequest.set('bugTrackerURL', '');
              reviewRequest.draft.set('bugsClosed', [1, 2, 3]);
              editor.trigger('fieldChanged:bugsClosed');
              jasmineCore.expect($field.html()).toBe('1, 2, 3');
            });
          });
          editCountTests();
          securityTests();
        });
        jasmineCore.describe('Depends On', function () {
          setupFieldTests({
            fieldName: 'dependsOn',
            jsonFieldName: 'depends_on',
            selector: '#field_depends_on'
          });
          hasAutoCompleteTest();
          hasEditorTest();
          savingTest();
          jasmineCore.it('Formatting', function () {
            reviewRequest.draft.set('dependsOn', [{
              id: '123',
              url: '/r/123/'
            }, {
              id: '124',
              url: '/r/124/'
            }]);
            editor.trigger('fieldChanged:dependsOn');
            const $fieldChildren = $field.children();
            jasmineCore.expect($field.text()).toBe('123, 124');
            jasmineCore.expect($fieldChildren.eq(0).attr('href')).toBe('/r/123/');
            jasmineCore.expect($fieldChildren.eq(1).attr('href')).toBe('/r/124/');
          });
          editCountTests();
          securityTests();
        });
        jasmineCore.describe('Change Descriptions', function () {
          function closeDescriptionTests(options) {
            jasmineCore.beforeEach(function () {
              reviewRequest.set('state', options.closeType);
              view.showBanner();
              jasmineCore.spyOn(reviewRequest, 'close').and.callThrough();
              jasmineCore.spyOn(reviewRequest, 'save').and.resolveTo();
            });
            setupFieldTests({
              fieldName: 'closeDescription',
              jsonFieldName: 'close_description',
              selector: options.bannerSel + ' #field_close_description'
            });
            hasEditorTest();
            jasmineCore.it('Starts closed', function () {
              jasmineCore.expect($input.is(':visible')).toBe(false);
            });
            jasmineCore.describe('Saves', function () {
              function testSave(richText, textType, setRichText) {
                const expectedData = {
                  force_text_type: 'html',
                  include_text_types: 'raw',
                  status: options.jsonCloseType
                };
                expectedData[options.jsonTextTypeFieldName] = textType;
                expectedData[options.jsonFieldName] = 'My Value';
                fieldEditor.startEdit();
                const textEditor = fieldEditor.textEditor;
                textEditor.setText('My Value');
                if (setRichText !== false) {
                  textEditor.setRichText(richText);
                }
                $input.triggerHandler('keyup');
                fieldEditor.submit();
                jasmineCore.expect(reviewRequest.close).toHaveBeenCalled();
                jasmineCore.expect(reviewRequest.save).toHaveBeenCalled();
                jasmineCore.expect(reviewRequest.save.calls.argsFor(0)[0].data).toEqual(expectedData);
              }
              jasmineCore.it('For Markdown', function () {
                testSave(true, 'markdown', true);
              });
              jasmineCore.it('For plain text', function () {
                testSave(false, 'plain', true);
              });
            });
            jasmineCore.describe('State when statusEditable', function () {
              jasmineCore.it('Disabled when false', function () {
                editor.set('statusEditable', false);
                jasmineCore.expect(fieldEditor.options.enabled).toBe(false);
              });
              jasmineCore.it('Enabled when true', function () {
                editor.set('statusEditable', true);
                jasmineCore.expect(fieldEditor.options.enabled).toBe(true);
              });
            });
            jasmineCore.describe('Formatting', function () {
              jasmineCore.it('Links', function () {
                reviewRequest.set('closeDescription', 'Testing /r/123');
                editor.trigger('fieldChanged:closeDescription');
                jasmineCore.expect($field.text()).toBe('Testing /r/123');
                jasmineCore.expect($field.find('a').attr('href')).toBe('/r/123/');
              });
            });
            inlineEditorResizeTests();
            editCountTests();
            securityTests({
              fieldOnReviewRequest: true,
              supportsRichText: true
            });
          }
          jasmineCore.describe('Discarded review requests', function () {
            closeDescriptionTests({
              bannerSel: '#discard-banner',
              closeType: RB.ReviewRequest.CLOSE_DISCARDED,
              jsonCloseType: 'discarded',
              jsonFieldName: 'close_description',
              jsonTextTypeFieldName: 'close_description_text_type'
            });
          });
          jasmineCore.describe('Draft review requests', function () {
            jasmineCore.beforeEach(function () {
              view.model.set('hasDraft', true);
              if (!RB.EnabledFeatures.unifiedBanner) {
                view.showBanner();
              }
            });
            const selector = RB.EnabledFeatures.unifiedBanner ? '#unified-banner #field_change_description' : '#draft-banner #field_change_description';
            setupFieldTests({
              fieldID: 'change_description',
              fieldName: 'changeDescription',
              jsonFieldName: 'changedescription',
              selector: selector,
              supportsRichText: true
            });
            hasEditorTest();
            richTextSavingTest();
            editCountTests();
            securityTests({
              fieldOnReviewRequest: true,
              supportsRichText: true
            });
          });
          jasmineCore.describe('Submitted review requests', function () {
            closeDescriptionTests({
              bannerSel: '#submitted-banner',
              closeType: RB.ReviewRequest.CLOSE_SUBMITTED,
              jsonCloseType: 'submitted',
              jsonFieldName: 'close_description',
              jsonTextTypeFieldName: 'close_description_text_type'
            });
          });
        });
        jasmineCore.describe('Description', function () {
          setupFieldTests({
            fieldName: 'description',
            jsonFieldName: 'description',
            selector: '#field_description',
            supportsRichText: true
          });
          hasEditorTest();
          richTextSavingTest();
          jasmineCore.describe('Formatting', function () {
            jasmineCore.it('Links', function () {
              reviewRequest.draft.set('description', 'Testing /r/123');
              editor.trigger('fieldChanged:description');
              jasmineCore.expect($field.text()).toBe('Testing /r/123');
              jasmineCore.expect($field.find('a').attr('href')).toBe('/r/123/');
            });
          });
          inlineEditorResizeTests();
          editCountTests();
          securityTests({
            supportsRichText: true
          });
        });
        jasmineCore.describe('Summary', function () {
          setupFieldTests({
            fieldName: 'summary',
            jsonFieldName: 'summary',
            selector: '#field_summary'
          });
          hasEditorTest();
          savingTest();
          editCountTests();
          securityTests();
        });
        jasmineCore.describe('Testing Done', function () {
          setupFieldTests({
            fieldName: 'testingDone',
            jsonFieldName: 'testing_done',
            selector: '#field_testing_done',
            supportsRichText: true
          });
          hasEditorTest();
          richTextSavingTest();
          jasmineCore.describe('Formatting', function () {
            jasmineCore.it('Links', function () {
              reviewRequest.draft.set('testingDone', 'Testing /r/123');
              editor.trigger('fieldChanged:testingDone');
              jasmineCore.expect($field.text()).toBe('Testing /r/123');
              jasmineCore.expect($field.find('a').attr('href')).toBe('/r/123/');
            });
          });
          inlineEditorResizeTests();
          editCountTests();
          securityTests({
            supportsRichText: true
          });
        });
        jasmineCore.describe('Reviewers', function () {
          jasmineCore.describe('Groups', function () {
            setupFieldTests({
              fieldName: 'targetGroups',
              jsonFieldName: 'target_groups',
              selector: '#field_target_groups'
            });
            hasAutoCompleteTest();
            hasEditorTest();
            savingTest();
            jasmineCore.it('Formatting', function () {
              reviewRequest.draft.set('targetGroups', [{
                name: 'group1',
                url: '/groups/group1/'
              }, {
                name: 'group2',
                url: '/groups/group2/'
              }]);
              editor.trigger('fieldChanged:targetGroups');
              jasmineCore.expect($field.html()).toBe('<a href="/groups/group1/">group1</a>, ' + '<a href="/groups/group2/">group2</a>');
            });
            editCountTests();
            securityTests();
          });
          jasmineCore.describe('People', function () {
            setupFieldTests({
              fieldName: 'targetPeople',
              jsonFieldName: 'target_people',
              selector: '#field_target_people'
            });
            hasAutoCompleteTest();
            hasEditorTest();
            savingTest();
            jasmineCore.it('Formatting', function () {
              reviewRequest.draft.set('targetPeople', [{
                url: '/users/user1/',
                username: 'user1'
              }, {
                url: '/users/user2/',
                username: 'user2'
              }]);
              editor.trigger('fieldChanged:targetPeople');
              jasmineCore.expect($field.text()).toBe('user1, user2');
              jasmineCore.expect($($field.children()[0]).attr('href')).toBe('/users/user1/');
              jasmineCore.expect($($field.children()[1]).attr('href')).toBe('/users/user2/');
            });
            editCountTests();
            securityTests();
          });
        });
        jasmineCore.describe('Owner', function () {
          setupFieldTests({
            jsonFieldName: 'submitter',
            selector: '#field_submitter'
          });
          hasAutoCompleteTest();
          hasEditorTest();
          savingTest();
          jasmineCore.it('Formatting', function () {
            reviewRequest.draft.set('submitter', {
              href: '/users/user1/',
              title: 'user1'
            });
            editor.trigger('fieldChanged:submitter');
            jasmineCore.expect($field.text()).toBe('user1');
            jasmineCore.expect($field.children().attr('href')).toBe('/users/user1/');
          });
          editCountTests();
        });
        jasmineCore.describe('Custom fields', function () {
          jasmineCore.beforeEach(function () {
            saveSpyFunc = options => {
              jasmineCore.expect(options.data['extra_data.' + jsonFieldName]).toBe('My Value');
              return Promise.resolve();
            };
          });
          setupFieldTests({
            fieldID: 'my_custom',
            jsonFieldName: 'my_custom',
            selector: '#field_my_custom',
            useExtraData: true
          });
          hasEditorTest();
          savingTest();
          editCountTests();
          securityTests();
        });
        jasmineCore.describe('Custom rich-text field', function () {
          jasmineCore.beforeEach(function () {
            saveSpyFunc = options => {
              jasmineCore.expect(options.data['extra_data.' + jsonFieldName]).toBe('My Value');
              return Promise.resolve();
            };
          });
          setupFieldTests({
            fieldID: 'my_rich_text_custom',
            jsonFieldName: 'my_rich_text_custom',
            selector: '#field_my_rich_text_custom',
            supportsRichText: true,
            useExtraData: true
          });
          jasmineCore.it('Initial rich text state', function () {
            jasmineCore.expect(fieldEditor.textEditor.richText).toBe(true);
          });
          hasEditorTest();
          richTextSavingTest();
          inlineEditorResizeTests();
          editCountTests();
          securityTests();
        });
        jasmineCore.describe('Custom rich-text field with special name', function () {
          jasmineCore.beforeEach(function () {
            saveSpyFunc = options => {
              jasmineCore.expect(options.data['extra_data.' + jsonFieldName]).toBe('My Value');
              return Promise.resolve();
            };
          });
          setupFieldTests({
            fieldID: 'text',
            jsonFieldName: 'text',
            selector: '#field_text',
            supportsRichText: true,
            useExtraData: true
          });
          hasEditorTest();
          richTextSavingTest();
          inlineEditorResizeTests();
          editCountTests();
          securityTests();
        });
        jasmineCore.describe('Custom checkbox field', function () {
          jasmineCore.beforeEach(function () {
            $field = view.$('#field_checkbox');
            saveSpyFunc = options => {
              jasmineCore.expect(options.data['extra_data.checkbox']).toBe(true);
              return Promise.resolve();
            };
            reviewRequest.draft.save.and.callFake(saveSpyFunc);
          });
          jasmineCore.it('Saves', function () {
            const expectedData = {
              'extra_data.checkbox': true
            };
            $field.click();
            jasmineCore.expect(reviewRequest.draft.save).toHaveBeenCalled();
            jasmineCore.expect(reviewRequest.draft.save.calls.argsFor(0)[0].data).toEqual(expectedData);
          });
        });
      });
      jasmineCore.describe('File attachments', function () {
        jasmineCore.it('Rendering when added', function () {
          jasmineCore.spyOn(RB.FileAttachmentThumbnailView.prototype, 'render').and.callThrough();
          jasmineCore.expect($filesContainer.find('.file-container').length).toBe(0);
          view.render();
          editor.createFileAttachment();
          jasmineCore.expect(RB.FileAttachmentThumbnailView.prototype.render).toHaveBeenCalled();
          jasmineCore.expect($filesContainer.find('.file-container').length).toBe(1);
        });
        jasmineCore.describe('Events', function () {
          let fileAttachment;
          let $thumbnail;
          jasmineCore.beforeEach(function () {
            view.render();
            fileAttachment = editor.createFileAttachment();
            $thumbnail = $($filesContainer.find('.file-container')[0]);
            jasmineCore.expect($thumbnail.length).toBe(1);
          });
          jasmineCore.describe('beginEdit', function () {
            jasmineCore.it('Increment edit count', function () {
              jasmineCore.expect(editor.get('editCount')).toBe(0);
              $thumbnail.find('.file-caption .edit').data('inline-editor').startEdit();
              jasmineCore.expect(editor.get('editCount')).toBe(1);
            });
          });
          jasmineCore.describe('endEdit', function () {
            jasmineCore.describe('Decrement edit count', function () {
              let $caption;
              let inlineEditorView;
              jasmineCore.beforeEach(function () {
                jasmineCore.expect(editor.get('editCount')).toBe(0);
                $caption = $thumbnail.find('.file-caption .edit');
                inlineEditorView = $caption.data('inline-editor');
                inlineEditorView.startEdit();
              });
              jasmineCore.it('On cancel', function () {
                inlineEditorView.cancel();
                jasmineCore.expect(editor.get('editCount')).toBe(0);
              });
              jasmineCore.it('On submit', function (done) {
                jasmineCore.spyOn(fileAttachment, 'ready').and.resolveTo();
                jasmineCore.spyOn(fileAttachment, 'save').and.resolveTo();
                $thumbnail.find('input').val('Foo').triggerHandler('keyup');
                inlineEditorView.submit();
                _.defer(() => {
                  jasmineCore.expect(editor.get('editCount')).toBe(0);
                  done();
                });
              });
            });
          });
        });
      });
      jasmineCore.describe('Methods', function () {
        jasmineCore.describe('getFieldView', function () {
          jasmineCore.it('Correct field is returned', function () {
            const fieldView = view.getFieldView('target_groups');
            jasmineCore.expect(fieldView).not.toBe(undefined);
            jasmineCore.expect(fieldView.fieldID).toBe('target_groups');
            jasmineCore.expect(view.getFieldView('some_random_id')).toBe(undefined);
          });
        });
      });
      jasmineCore.describe('Screenshots', function () {
        jasmineCore.describe('Importing on render', function () {
          jasmineCore.it('No screenshots', function () {
            view.render();
            jasmineCore.expect(editor.get('screenshots').length).toBe(0);
          });
          jasmineCore.it('With screenshots', function () {
            const screenshots = editor.get('screenshots');
            $screenshotsContainer.append(screenshotThumbnailTemplate({
              id: 42
            }));
            jasmineCore.spyOn(RB.ScreenshotThumbnail.prototype, 'render').and.callThrough();
            view.render();
            jasmineCore.expect(RB.ScreenshotThumbnail.prototype.render).toHaveBeenCalled();
            jasmineCore.expect(screenshots.length).toBe(1);
            jasmineCore.expect(screenshots.at(0).id).toBe(42);
          });
        });
        jasmineCore.describe('Events', function () {
          let $thumbnail;
          let screenshot;
          let screenshotView;
          let captionEditorView;
          jasmineCore.beforeEach(function () {
            $thumbnail = $(screenshotThumbnailTemplate({
              id: 42
            })).appendTo($screenshotsContainer);
            jasmineCore.spyOn(RB.ScreenshotThumbnail.prototype, 'render').and.callThrough();
            view.render();
            screenshot = editor.get('screenshots').at(0);
            screenshotView = RB.ScreenshotThumbnail.prototype.render.calls.thisFor(0);
            captionEditorView = screenshotView._captionEditorView;
          });
          jasmineCore.describe('beginEdit', function () {
            jasmineCore.it('Increment edit count', function () {
              jasmineCore.expect(editor.get('editCount')).toBe(0);
              captionEditorView.startEdit();
              jasmineCore.expect(editor.get('editCount')).toBe(1);
            });
          });
          jasmineCore.describe('endEdit', function () {
            jasmineCore.describe('Decrement edit count', function () {
              jasmineCore.beforeEach(function () {
                jasmineCore.expect(editor.get('editCount')).toBe(0);
                captionEditorView.startEdit();
              });
              jasmineCore.it('On cancel', function () {
                captionEditorView.cancel();
                jasmineCore.expect(editor.get('editCount')).toBe(0);
              });
              jasmineCore.it('On submit', function (done) {
                jasmineCore.spyOn(screenshot, 'ready').and.resolveTo();
                jasmineCore.spyOn(screenshot, 'save').and.resolveTo();
                $thumbnail.find('input').val('Foo').triggerHandler('keyup');
                captionEditorView.submit();
                _.defer(() => {
                  jasmineCore.expect(editor.get('editCount')).toBe(0);
                  done();
                });
              });
            });
          });
        });
      });
      jasmineCore.describe('beforeUnload event handler', function () {
        /*
         * The components in ReviewablePageView uses editCount to determine how
         * many fields are being modified at the time, whereas editable/
         * statusEditable is only used in ReviewRequestEditorView.
         * So test both editable/statusEditable states to catch regressions
         * where onBeforeUnload becomes tied to editable/statusEditable states.
         */
        jasmineCore.describe('editable=true', function () {
          jasmineCore.beforeEach(function () {
            editor.set('statusEditable', true);
            editor.set('editable', true);
            jasmineCore.expect(editor.get('statusEditable')).toBe(true);
            jasmineCore.expect(editor.get('editable')).toBe(true);
            jasmineCore.expect(editor.get('editCount')).toBe(0);
          });
          jasmineCore.it('Warn user beforeUnload when editing', function () {
            view.model.incr('editCount');
            jasmineCore.expect(editor.get('editCount')).toBe(1);
            jasmineCore.expect(view._onBeforeUnload($.Event('beforeunload'))).toBeDefined();
          });
          jasmineCore.it("Don't warn user beforeUnload when not editing", function () {
            jasmineCore.expect(view._onBeforeUnload($.Event('beforeunload'))).toBeUndefined();
          });
        });
        jasmineCore.describe('editable=false', function () {
          jasmineCore.beforeEach(function () {
            editor.set('statusEditable', false);
            editor.set('editable', false);
            jasmineCore.expect(editor.get('statusEditable')).toBe(false);
            jasmineCore.expect(editor.get('editable')).toBe(false);
            jasmineCore.expect(editor.get('editCount')).toBe(0);
          });
          jasmineCore.it('Warn user beforeUnload when editing', function () {
            view.model.incr('editCount');
            jasmineCore.expect(editor.get('editCount')).toBe(1);
            jasmineCore.expect(view._onBeforeUnload($.Event('beforeunload'))).toBeDefined();
          });
          jasmineCore.it("Don't warn user beforeUnload when not editing", function () {
            jasmineCore.expect(view._onBeforeUnload($.Event('beforeunload'))).toBeUndefined();
          });
        });
      });
    });

    const {
      BaseFieldView,
      MultilineTextFieldView,
      TextFieldView
    } = RB.ReviewRequestFields;
    jasmineSuites.suite('rb/views/reviewRequestFieldViews', function () {
      let reviewRequest;
      let draft;
      let extraData;
      let rawTextFields;
      let editor;
      let editorView;
      let field;
      jasmineCore.beforeEach(function () {
        reviewRequest = new RB.ReviewRequest({
          id: 1
        });
        draft = reviewRequest.draft;
        extraData = draft.get('extraData');
        rawTextFields = {
          extra_data: {}
        };
        draft.set('rawTextFields', rawTextFields);
        editor = new RB.ReviewRequestEditor({
          reviewRequest: reviewRequest
        });
        editorView = new RB.ReviewRequestEditorView({
          model: editor
        });
        jasmineCore.spyOn(draft, 'save').and.resolveTo();
        jasmineCore.spyOn(draft, 'ready').and.resolveTo();
      });
      jasmineCore.describe('BaseFieldView', function () {
        jasmineCore.beforeEach(function () {
          field = new BaseFieldView({
            fieldID: 'my_field',
            model: editor
          });
        });
        jasmineCore.describe('Initialization', function () {
          jasmineCore.it('Default behavior', function () {
            jasmineCore.expect(field.$el.data('field-id')).toBe('my_field');
            jasmineCore.expect(field.jsonFieldName).toBe('my_field');
          });
          jasmineCore.it('With custom jsonFieldName', function () {
            const field = new BaseFieldView({
              fieldID: 'my_field',
              jsonFieldName: 'my_custom_name',
              model: editor
            });
            jasmineCore.expect(field.$el.data('field-id')).toBe('my_field');
            jasmineCore.expect(field.jsonFieldName).toBe('my_custom_name');
          });
        });
        jasmineCore.describe('Properties', function () {
          jasmineCore.it('fieldName', function () {
            jasmineCore.expect(field.fieldName()).toBe('myField');
          });
        });
        jasmineCore.describe('Methods', function () {
          jasmineCore.describe('_loadValue', function () {
            jasmineCore.it('Built-in field', function () {
              field.useExtraData = false;
              draft.set('myField', 'this is a test');
              jasmineCore.expect(field._loadValue()).toBe('this is a test');
            });
            jasmineCore.it('Custom field', function () {
              extraData.my_field = 'this is a test';
              jasmineCore.expect(field._loadValue()).toBe('this is a test');
            });
            jasmineCore.it('Custom field and custom jsonFieldName', function () {
              const field = new BaseFieldView({
                fieldID: 'my_field',
                jsonFieldName: 'foo',
                model: editor
              });
              extraData.foo = 'this is a test';
              jasmineCore.expect(field._loadValue()).toBe('this is a test');
            });
          });
          jasmineCore.describe('_saveValue', function () {
            jasmineCore.it('Built-in field', function (done) {
              field.useExtraData = false;
              field._saveValue('test').then(() => {
                jasmineCore.expect(draft.save.calls.argsFor(0)[0].data).toEqual({
                  my_field: 'test'
                });
                done();
              }).catch(err => done.fail(err));
            });
            jasmineCore.it('Custom field', function (done) {
              field._saveValue('this is a test').then(() => {
                jasmineCore.expect(draft.save.calls.argsFor(0)[0].data).toEqual({
                  'extra_data.my_field': 'this is a test'
                });
                done();
              }).catch(err => done.fail(err));
            });
            jasmineCore.it('Custom field and custom jsonFieldName', function (done) {
              const field = new BaseFieldView({
                fieldID: 'my_field',
                jsonFieldName: 'foo',
                model: editor
              });
              field._saveValue('this is a test').then(() => {
                jasmineCore.expect(draft.save.calls.argsFor(0)[0].data).toEqual({
                  'extra_data.foo': 'this is a test'
                });
                done();
              }).catch(err => done.fail(err));
            });
          });
        });
      });
      jasmineCore.describe('TextFieldView', function () {
        jasmineCore.beforeEach(function () {
          field = new TextFieldView({
            fieldID: 'my_field',
            model: editor
          });
          editorView.addFieldView(field);
        });
        jasmineCore.describe('Properties', function () {
          jasmineCore.describe('jsonTextTypeFieldName', function () {
            jasmineCore.it('With fieldID != "text"', function () {
              jasmineCore.expect(field.jsonTextTypeFieldName).toBe('my_field_text_type');
            });
            jasmineCore.it('With fieldID = "text"', function () {
              field = new TextFieldView({
                fieldID: 'text',
                model: editor
              });
              jasmineCore.expect(field.jsonTextTypeFieldName).toBe('text_type');
            });
          });
          jasmineCore.describe('richTextAttr', function () {
            jasmineCore.it('With allowRichText=true', function () {
              field.allowRichText = true;
              jasmineCore.expect(field.richTextAttr()).toBe('myFieldRichText');
            });
            jasmineCore.it('With allowRichText=false', function () {
              field.allowRichText = false;
              jasmineCore.expect(field.richTextAttr()).toBe(null);
            });
          });
        });
        jasmineCore.describe('Methods', function () {
          jasmineCore.describe('render', function () {
            jasmineCore.beforeEach(function () {
              field.$el.addClass('editable');
              rawTextFields.extra_data = {
                my_field: '**Hello world**',
                my_field_text_type: 'markdown'
              };
            });
            jasmineCore.describe('With allowRichText=true', function () {
              jasmineCore.beforeEach(function () {
                field.allowRichText = true;
              });
              jasmineCore.it('With richText=true', function () {
                rawTextFields.extra_data.my_field_text_type = 'markdown';
                field.render();
                jasmineCore.expect(field.inlineEditorView.textEditor.richText).toBe(true);
                jasmineCore.expect(field.inlineEditorView.options.rawValue).toBe('**Hello world**');
              });
              jasmineCore.it('With richText=false', function () {
                rawTextFields.extra_data.my_field_text_type = 'plain';
                field.render();
                jasmineCore.expect(field.inlineEditorView.textEditor.richText).toBe(false);
                jasmineCore.expect(field.inlineEditorView.options.rawValue).toBe('**Hello world**');
              });
            });
          });
          jasmineCore.describe('_formatField', function () {
            jasmineCore.it('With built-in field', function () {
              field.useExtraData = false;
              draft.set('myField', 'Hello world');
              field._formatField();
              jasmineCore.expect(field.$el.text()).toBe('Hello world');
            });
            jasmineCore.it('With custom field', function () {
              editorView.addFieldView(field);
              extraData.my_field = 'Hello world';
              field._formatField();
              jasmineCore.expect(field.$el.text()).toBe('Hello world');
            });
            jasmineCore.it('With formatValue as function', function () {
              field.formatValue = function (value) {
                this.$el.text(`[${value}]`);
              };
              extraData.my_field = 'Hello world';
              field._formatField();
              jasmineCore.expect(field.$el.text()).toBe('[Hello world]');
            });
          });
          jasmineCore.describe('_getInlineEditorClass', function () {
            jasmineCore.it('With allowRichText=true', function () {
              field.allowRichText = true;
              jasmineCore.expect(field._getInlineEditorClass()).toBe(RB.RichTextInlineEditorView);
            });
            jasmineCore.it('With allowRichText=false', function () {
              field.allowRichText = false;
              jasmineCore.expect(field._getInlineEditorClass()).toBe(RB.InlineEditorView);
            });
          });
          jasmineCore.describe('_loadRichTextValue', function () {
            jasmineCore.beforeEach(function () {
              field.allowRichText = true;
            });
            jasmineCore.describe('With built-in field', function () {
              jasmineCore.beforeEach(function () {
                field.useExtraData = false;
              });
              jasmineCore.it('With value=undefined', function () {
                draft.set('myFieldRichText', undefined);
                jasmineCore.expect(field._loadRichTextValue()).toBe(undefined);
              });
              jasmineCore.it('With value=false', function () {
                draft.set('myFieldRichText', false);
                jasmineCore.expect(field._loadRichTextValue()).toBe(false);
              });
              jasmineCore.it('With value=true', function () {
                draft.set('myFieldRichText', true);
                jasmineCore.expect(field._loadRichTextValue()).toBe(true);
              });
            });
            jasmineCore.describe('With custom field', function () {
              jasmineCore.it('With textType=undefined', function () {
                jasmineCore.expect(field._loadRichTextValue()).toBe(undefined);
              });
              jasmineCore.it('With textType=plain', function () {
                rawTextFields.extra_data.my_field_text_type = 'plain';
                jasmineCore.expect(field._loadRichTextValue()).toBe(false);
              });
              jasmineCore.it('With textType=markdown', function () {
                rawTextFields.extra_data.my_field_text_type = 'markdown';
                jasmineCore.expect(field._loadRichTextValue()).toBe(true);
              });
              jasmineCore.it('With textType=invalid value', function () {
                rawTextFields.extra_data.my_field_text_type = 'html';
                try {
                  field._loadRichTextValue();
                } catch (e) {
                  // Do nothing.
                }
                jasmineCore.expect(console.assert).toHaveBeenCalledWith(false, 'Text type "html" in field "my_field_text_type" ' + 'not supported.');
              });
            });
          });
        });
      });
      jasmineCore.describe('MultilineTextFieldView', function () {
        jasmineCore.describe('Initialization from DOM', function () {
          let $el;
          jasmineCore.beforeEach(function () {
            $el = $('<span data-allow-markdown="true">').text('DOM text value');
          });
          jasmineCore.describe('allowRichText', function () {
            jasmineCore.it('allow-markdown=true', function () {
              field = new MultilineTextFieldView({
                el: $el,
                fieldID: 'my_field',
                jsonFieldName: 'foo',
                model: editor
              });
              jasmineCore.expect(field.allowRichText).toBe(true);
            });
            jasmineCore.it('allow-markdown=false', function () {
              field = new MultilineTextFieldView({
                el: $el.attr('data-allow-markdown', 'false'),
                fieldID: 'my_field',
                jsonFieldName: 'foo',
                model: editor
              });
              jasmineCore.expect(field.allowRichText).toBe(false);
            });
            jasmineCore.it('allow-markdown unset', function () {
              field = new MultilineTextFieldView({
                el: $el.removeAttr('data-allow-markdown'),
                fieldID: 'my_field',
                jsonFieldName: 'foo',
                model: editor
              });
              jasmineCore.expect(field.allowRichText).toBe(undefined);
            });
          });
          jasmineCore.describe('Text value', function () {
            jasmineCore.it('raw-value set', function () {
              field = new MultilineTextFieldView({
                el: $el.attr('data-raw-value', 'attr text value'),
                fieldID: 'my_field',
                jsonFieldName: 'foo',
                model: editor
              });
              jasmineCore.expect(extraData.foo).toBe('attr text value');
              jasmineCore.expect($el.attr('data-raw-value')).toBe(undefined);
            });
            jasmineCore.it('raw-value unset', function () {
              field = new MultilineTextFieldView({
                el: $el,
                fieldID: 'my_field',
                jsonFieldName: 'foo',
                model: editor
              });
              jasmineCore.expect(extraData.foo).toBe('DOM text value');
            });
          });
          jasmineCore.describe('Text type value', function () {
            jasmineCore.it('rich-text class present', function () {
              field = new MultilineTextFieldView({
                el: $el.addClass('rich-text'),
                fieldID: 'my_field',
                jsonFieldName: 'foo',
                model: editor
              });
              jasmineCore.expect(extraData.foo_text_type).toBe('markdown');
            });
            jasmineCore.it('rich-text class not present', function () {
              field = new MultilineTextFieldView({
                el: $el,
                fieldID: 'my_field',
                jsonFieldName: 'foo',
                model: editor
              });
              jasmineCore.expect(extraData.foo_text_type).toBe('plain');
            });
          });
        });
      });
    });

    jasmineSuites.suite('rb/pages/views/ReviewablePageView', function () {
      const pageTemplate = `<div id="review-banner"></div>
<div id="unified-banner">
 <div class="rb-c-unified-banner__mode-selector"></div>
</div>
<a href="#" id="action-legacy-edit-review">Edit Review</a>
<a href="#" id="action-legacy-ship-it">Ship It</a>`;
      let $editReview;
      let page;
      let pageView;
      jasmineCore.beforeEach(function () {
        const $container = $('<div>').html(pageTemplate).appendTo($testsScratch);
        RB.DnDUploader.instance = null;
        $editReview = $container.find('#action-legacy-edit-review');
        page = new RB.ReviewablePage({
          checkForUpdates: false,
          editorData: {
            mutableByUser: true,
            statusMutableByUser: true
          },
          reviewRequestData: {
            id: 123,
            loaded: true,
            state: RB.ReviewRequest.PENDING
          }
        }, {
          parse: true
        });
        jasmineCore.spyOn(RB.HeaderView.prototype, '_ensureSingleton');
        pageView = new RB.ReviewablePageView({
          el: $container,
          model: page
        });
        const reviewRequest = page.get('reviewRequest');
        jasmineCore.spyOn(reviewRequest, 'ready').and.resolveTo();
        jasmineCore.spyOn(reviewRequest.draft, 'ready').and.resolveTo();
        jasmineCore.spyOn(page.get('pendingReview'), 'ready').and.resolveTo();
        jasmineCore.spyOn(RB, 'navigateTo');
        pageView.render();
      });
      jasmineCore.afterEach(function () {
        RB.DnDUploader.instance = null;
        if (RB.EnabledFeatures.unifiedBanner) {
          RB.UnifiedBannerView.resetInstance();
        }
        pageView.remove();
      });
      jasmineCore.describe('Public objects', function () {
        jasmineCore.it('reviewRequest', function () {
          jasmineCore.expect(page.get('reviewRequest')).not.toBe(undefined);
        });
        jasmineCore.it('pendingReview', function () {
          const pendingReview = page.get('pendingReview');
          jasmineCore.expect(pendingReview).not.toBe(undefined);
          jasmineCore.expect(pendingReview.get('parentObject')).toBe(page.get('reviewRequest'));
        });
        jasmineCore.it('commentIssueManager', function () {
          jasmineCore.expect(page.commentIssueManager).not.toBe(undefined);
          jasmineCore.expect(page.commentIssueManager.get('reviewRequest')).toBe(page.get('reviewRequest'));
        });
        jasmineCore.it('reviewRequestEditor', function () {
          const reviewRequestEditor = page.reviewRequestEditor;
          jasmineCore.expect(reviewRequestEditor).not.toBe(undefined);
          jasmineCore.expect(reviewRequestEditor.get('reviewRequest')).toBe(page.get('reviewRequest'));
          jasmineCore.expect(reviewRequestEditor.get('commentIssueManager')).toBe(page.commentIssueManager);
          jasmineCore.expect(reviewRequestEditor.get('editable')).toBe(true);
        });
        jasmineCore.it('reviewRequestEditorView', function () {
          jasmineCore.expect(pageView.reviewRequestEditorView).not.toBe(undefined);
          jasmineCore.expect(pageView.reviewRequestEditorView.model).toBe(page.reviewRequestEditor);
        });
      });
      jasmineCore.describe('Actions', function () {
        jasmineCore.it('Edit Review', function () {
          if (RB.EnabledFeatures.unifiedBanner) {
            jasmineCore.pending();
            return;
          }
          jasmineCore.spyOn(RB.ReviewDialogView, 'create');
          $editReview.click();
          jasmineCore.expect(RB.ReviewDialogView.create).toHaveBeenCalled();
          const options = RB.ReviewDialogView.create.calls.argsFor(0)[0];
          jasmineCore.expect(options.review).toBe(page.get('pendingReview'));
          jasmineCore.expect(options.reviewRequestEditor).toBe(page.reviewRequestEditor);
        });
        jasmineCore.describe('Ship It', function () {
          let pendingReview;
          jasmineCore.beforeEach(function () {
            pendingReview = page.get('pendingReview');
          });
          jasmineCore.it('Confirmed', async function () {
            if (RB.EnabledFeatures.unifiedBanner) {
              jasmineCore.pending();
              return;
            }
            jasmineCore.spyOn(window, 'confirm').and.returnValue(true);
            jasmineCore.spyOn(pendingReview, 'save').and.resolveTo();
            jasmineCore.spyOn(pendingReview, 'publish').and.callThrough();
            if (!RB.EnabledFeatures.unifiedBanner) {
              jasmineCore.spyOn(pageView.draftReviewBanner, 'hideAndReload').and.callFake(() => {
                jasmineCore.expect(window.confirm).toHaveBeenCalled();
                jasmineCore.expect(pendingReview.ready).toHaveBeenCalled();
                jasmineCore.expect(pendingReview.publish).toHaveBeenCalled();
                jasmineCore.expect(pendingReview.save).toHaveBeenCalled();
                jasmineCore.expect(pendingReview.get('shipIt')).toBe(true);
                jasmineCore.expect(pendingReview.get('bodyTop')).toBe('Ship It!');
              });
            }
            await pageView.shipIt();
          });
          jasmineCore.it('Canceled', async function () {
            if (RB.EnabledFeatures.unifiedBanner) {
              jasmineCore.pending();
              return;
            }
            jasmineCore.spyOn(window, 'confirm').and.returnValue(false);
            await pageView.shipIt();
            jasmineCore.expect(window.confirm).toHaveBeenCalled();
            jasmineCore.expect(pendingReview.ready).not.toHaveBeenCalled();
          });
        });
      });
      jasmineCore.describe('Update bubble', () => {
        const summary = 'My summary';
        const user = {
          fullname: 'Mr. User',
          url: '/users/foo/',
          username: 'user'
        };
        let $bubble;
        let bubbleView;
        jasmineCore.beforeEach(() => {
          page.get('reviewRequest').trigger('updated', {
            summary: summary,
            user: user
          });
          $bubble = $('#updates-bubble');
          bubbleView = pageView._updatesBubble;
        });
        jasmineCore.it('Displays', () => {
          jasmineCore.expect($bubble.length).toBe(1);
          jasmineCore.expect(bubbleView.$el[0]).toBe($bubble[0]);
          jasmineCore.expect($bubble.is(':visible')).toBe(true);
          jasmineCore.expect($bubble.find('.rb-c-page-updates-bubble__message').html()).toBe('My summary by <a href="/users/foo/">Mr. User</a>');
        });
        jasmineCore.describe('Actions', () => {
          jasmineCore.it('Ignore', done => {
            jasmineCore.spyOn(bubbleView, 'close').and.callThrough();
            jasmineCore.spyOn(bubbleView, 'trigger').and.callThrough();
            jasmineCore.spyOn(bubbleView, 'remove').and.callThrough();
            $bubble.find('[data-action="ignore"]').click();
            _.defer(() => {
              jasmineCore.expect(bubbleView.close).toHaveBeenCalled();
              jasmineCore.expect(bubbleView.remove).toHaveBeenCalled();
              jasmineCore.expect(bubbleView.trigger).toHaveBeenCalledWith('closed');
              done();
            });
          });
          jasmineCore.it('Update Page displays Updates Bubble', () => {
            jasmineCore.spyOn(bubbleView, 'trigger');
            $bubble.find('[data-action="update"]').click();
            jasmineCore.expect(bubbleView.trigger).toHaveBeenCalledWith('updatePage');
          });
          jasmineCore.it('Update Page calls notify if shouldNotify', () => {
            const info = {
              user: {
                fullname: 'Hello'
              }
            };
            RB.NotificationManager.instance._canNotify = true;
            jasmineCore.spyOn(RB.NotificationManager.instance, 'notify');
            jasmineCore.spyOn(RB.NotificationManager.instance, '_haveNotificationPermissions').and.returnValue(true);
            jasmineCore.spyOn(pageView, '_showUpdatesBubble');
            pageView._onReviewRequestUpdated(info);
            jasmineCore.expect(RB.NotificationManager.instance.notify).toHaveBeenCalled();
            jasmineCore.expect(pageView._showUpdatesBubble).toHaveBeenCalled();
          });
        });
      });
    });

    jasmineSuites.suite('rb/views/TextBasedReviewableView', function () {
      const template = `<div id="container">
 <div class="text-review-ui-views">
  <ul class="rb-c-tabs">
   <li class="rb-c-tabs__tab -is-active" data-view-mode="rendered">
    <a href="#rendered">Rendered</a>
   </li>
   <li class="rb-c-tabs__tab" data-view-mode="source">
    <a href="#source">Source</a>
   </li>
  </ul>
 </div>
 <table class="text-review-ui-rendered-table"></table>
 <table class="text-review-ui-text-table"></table>
</div>`;
      let $container;
      let reviewRequest;
      let model;
      let view;
      jasmineCore.beforeEach(function () {
        $container = $(template).appendTo($testsScratch);
        reviewRequest = new RB.ReviewRequest({
          reviewURL: '/r/123/'
        });
        model = new RB.TextBasedReviewable({
          fileAttachmentID: 456,
          hasRenderedView: true,
          reviewRequest: reviewRequest,
          viewMode: 'rendered'
        });
        view = new RB.TextBasedReviewableView({
          el: $container,
          model: model
        });

        /*
         * Disable the router so that the page doesn't change the URL on the
         * page while tests run.
         */
        jasmineCore.spyOn(window.history, 'pushState');
        jasmineCore.spyOn(window.history, 'replaceState');

        /*
         * Bypass all the actual history logic and get to the actual
         * router handler.
         */
        jasmineCore.spyOn(Backbone.history, 'matchRoot').and.returnValue(true);
        jasmineCore.spyOn(view.router, 'trigger').and.callThrough();
        jasmineCore.spyOn(view.router, 'navigate').and.callFake((url, options) => {
          if (!options || options.trigger !== false) {
            Backbone.history.loadUrl(url);
          }
        });
        view.render();
      });
      jasmineCore.afterEach(function () {
        view.remove();
        $container.remove();
        Backbone.history.stop();
      });
      jasmineCore.it('Router switches view modes', function () {
        view.router.navigate('#rendered');
        jasmineCore.expect(view.router.trigger).toHaveBeenCalledWith('route:viewMode', 'rendered', null, null);
        jasmineCore.expect($container.find('.-is-active').attr('data-view-mode')).toBe('rendered');
        jasmineCore.expect(model.get('viewMode')).toBe('rendered');
        view.router.navigate('#source');
        jasmineCore.expect(view.router.trigger).toHaveBeenCalledWith('route:viewMode', 'source', null, null);
        jasmineCore.expect($container.find('.-is-active').attr('data-view-mode')).toBe('source');
        jasmineCore.expect(model.get('viewMode')).toBe('source');
        view.router.navigate('#rendered');
        jasmineCore.expect(view.router.trigger).toHaveBeenCalledWith('route:viewMode', 'rendered', null, null);
        jasmineCore.expect($container.find('.-is-active').attr('data-view-mode')).toBe('rendered');
        jasmineCore.expect(model.get('viewMode')).toBe('rendered');
      });
    });

    jasmineSuites.suite('rb/ui/models/ContentViewport', () => {
      let contentViewport;
      let el1;
      let el2;
      async function waitForResize() {
        await new Promise(resolve => {
          contentViewport.once('handledResize', () => setTimeout(resolve, 0));
        });
      }
      jasmineCore.beforeEach(() => {
        contentViewport = new RB.ContentViewport();
        el1 = document.createElement('div');
        el1.style.width = '200px';
        el1.style.height = '100px';
        $testsScratch.append(el1);
        el2 = document.createElement('div');
        el2.style.width = '75px';
        el2.style.height = '50px';
        $testsScratch.append(el2);
      });
      jasmineCore.afterEach(() => {
        contentViewport.clearTracking();
      });
      jasmineCore.afterAll(() => {
        contentViewport = null;
        el1 = null;
        el2 = null;
      });
      jasmineCore.describe('Methods', () => {
        jasmineCore.describe('trackElement', () => {
          jasmineCore.it('On top', () => {
            contentViewport.trackElement({
              el: el1,
              side: 'top'
            });
            jasmineCore.expect(contentViewport.attributes).toEqual({
              bottom: 0,
              left: 0,
              right: 0,
              top: 100
            });
            contentViewport.trackElement({
              el: el2,
              side: 'top'
            });
            jasmineCore.expect(contentViewport.attributes).toEqual({
              bottom: 0,
              left: 0,
              right: 0,
              top: 150
            });
          });
          jasmineCore.it('On bottom', () => {
            contentViewport.trackElement({
              el: el1,
              side: 'bottom'
            });
            jasmineCore.expect(contentViewport.attributes).toEqual({
              bottom: 100,
              left: 0,
              right: 0,
              top: 0
            });
            contentViewport.trackElement({
              el: el2,
              side: 'bottom'
            });
            jasmineCore.expect(contentViewport.attributes).toEqual({
              bottom: 150,
              left: 0,
              right: 0,
              top: 0
            });
          });
          jasmineCore.it('On left', () => {
            contentViewport.trackElement({
              el: el1,
              side: 'left'
            });
            jasmineCore.expect(contentViewport.attributes).toEqual({
              bottom: 0,
              left: 200,
              right: 0,
              top: 0
            });
            contentViewport.trackElement({
              el: el2,
              side: 'left'
            });
            jasmineCore.expect(contentViewport.attributes).toEqual({
              bottom: 0,
              left: 275,
              right: 0,
              top: 0
            });
          });
          jasmineCore.it('On right', () => {
            contentViewport.trackElement({
              el: el1,
              side: 'right'
            });
            jasmineCore.expect(contentViewport.attributes).toEqual({
              bottom: 0,
              left: 0,
              right: 200,
              top: 0
            });
            contentViewport.trackElement({
              el: el2,
              side: 'right'
            });
            jasmineCore.expect(contentViewport.attributes).toEqual({
              bottom: 0,
              left: 0,
              right: 275,
              top: 0
            });
          });
        });
        jasmineCore.it('untrackElement', async () => {
          contentViewport.trackElement({
            el: el1,
            side: 'bottom'
          });
          contentViewport.trackElement({
            el: el2,
            side: 'bottom'
          });
          contentViewport.untrackElement(el1);
          jasmineCore.expect(contentViewport.attributes).toEqual({
            bottom: 50,
            left: 0,
            right: 0,
            top: 0
          });
          contentViewport.untrackElement(el2);
          jasmineCore.expect(contentViewport.attributes).toEqual({
            bottom: 0,
            left: 0,
            right: 0,
            top: 0
          });

          /* Make sure a resize doesn't trigger anything. */
          el1.style.width = '1000px';
          el2.style.height = '1000px';
          await new Promise(resolve => setTimeout(resolve, 50));
          jasmineCore.expect(contentViewport.attributes).toEqual({
            bottom: 0,
            left: 0,
            right: 0,
            top: 0
          });
        });
      });
      jasmineCore.describe('Events', () => {
        jasmineCore.describe('Element resize', () => {
          jasmineCore.it('On top', async () => {
            contentViewport.trackElement({
              el: el1,
              side: 'top'
            });
            contentViewport.trackElement({
              el: el2,
              side: 'top'
            });
            jasmineCore.expect(contentViewport.attributes).toEqual({
              bottom: 0,
              left: 0,
              right: 0,
              top: 150
            });

            /* Resize the first element. */
            el1.style.height = '113px';
            await waitForResize();
            jasmineCore.expect(contentViewport.attributes).toEqual({
              bottom: 0,
              left: 0,
              right: 0,
              top: 163
            });

            /* Resize the second element. */
            el2.style.height = '23px';
            await waitForResize();
            jasmineCore.expect(contentViewport.attributes).toEqual({
              bottom: 0,
              left: 0,
              right: 0,
              top: 136
            });
          });
          jasmineCore.it('On bottom', async () => {
            contentViewport.trackElement({
              el: el1,
              side: 'bottom'
            });
            contentViewport.trackElement({
              el: el2,
              side: 'bottom'
            });
            jasmineCore.expect(contentViewport.attributes).toEqual({
              bottom: 150,
              left: 0,
              right: 0,
              top: 0
            });

            /* Resize the first element. */
            el1.style.height = '113px';
            await waitForResize();
            jasmineCore.expect(contentViewport.attributes).toEqual({
              bottom: 163,
              left: 0,
              right: 0,
              top: 0
            });

            /* Resize the second element. */
            el2.style.height = '23px';
            await waitForResize();
            jasmineCore.expect(contentViewport.attributes).toEqual({
              bottom: 136,
              left: 0,
              right: 0,
              top: 0
            });
          });
          jasmineCore.it('On left', async () => {
            contentViewport.trackElement({
              el: el1,
              side: 'left'
            });
            contentViewport.trackElement({
              el: el2,
              side: 'left'
            });
            jasmineCore.expect(contentViewport.attributes).toEqual({
              bottom: 0,
              left: 275,
              right: 0,
              top: 0
            });

            /* Resize the first element. */
            el1.style.width = '209px';
            await waitForResize();
            jasmineCore.expect(contentViewport.attributes).toEqual({
              bottom: 0,
              left: 284,
              right: 0,
              top: 0
            });

            /* Resize the second element. */
            el2.style.width = '72px';
            await waitForResize();
            jasmineCore.expect(contentViewport.attributes).toEqual({
              bottom: 0,
              left: 281,
              right: 0,
              top: 0
            });
          });
          jasmineCore.it('On right', async () => {
            contentViewport.trackElement({
              el: el1,
              side: 'right'
            });
            contentViewport.trackElement({
              el: el2,
              side: 'right'
            });
            jasmineCore.expect(contentViewport.attributes).toEqual({
              bottom: 0,
              left: 0,
              right: 275,
              top: 0
            });

            /* Resize the first element. */
            el1.style.width = '209px';
            await waitForResize();
            jasmineCore.expect(contentViewport.attributes).toEqual({
              bottom: 0,
              left: 0,
              right: 284,
              top: 0
            });

            /* Resize the second element. */
            el2.style.width = '72px';
            await waitForResize();
            jasmineCore.expect(contentViewport.attributes).toEqual({
              bottom: 0,
              left: 0,
              right: 281,
              top: 0
            });
          });
        });
      });
    });

    jasmineSuites.suite('rb/ui/views/DateInlineEditorView', function () {
      const initialDate = '2022-09-16';
      let view;
      let $container;
      jasmineCore.beforeEach(function () {
        $container = $('<div>').appendTo($testsScratch);
      });
      jasmineCore.describe('Construction', function () {
        jasmineCore.it('Default', function () {
          view = new RB.DateInlineEditorView({
            el: $container
          });
          view.render();
          jasmineCore.expect(view.options.descriptorText).toBe(null);
          jasmineCore.expect(view.options.minDate).toBe(null);
          jasmineCore.expect(view.options.maxDate).toBe(null);
          jasmineCore.expect(view.options.rawValue).toBe(null);
          jasmineCore.expect(view.$buttons.length).toBe(1);
          jasmineCore.expect(view.$field.length).toBe(1);
          const field = view.$field[0];
          jasmineCore.expect(field.children.length).toBe(1);
          jasmineCore.expect(field.firstElementChild.outerHTML).toBe('<input type="date">');
        });
        jasmineCore.it('With options provided', function () {
          view = new RB.DateInlineEditorView({
            descriptorText: 'Test',
            el: $container,
            maxDate: '2030-10-10',
            minDate: '2020-10-10',
            rawValue: initialDate
          });
          view.render();
          jasmineCore.expect(view.options.descriptorText).toBe('Test');
          jasmineCore.expect(view.options.minDate).toBe('2020-10-10');
          jasmineCore.expect(view.options.maxDate).toBe('2030-10-10');
          jasmineCore.expect(view.options.rawValue).toBe(initialDate);
          jasmineCore.expect(view.$buttons.length).toBe(1);
          jasmineCore.expect(view.$field.length).toBe(1);
          const field = view.$field[0];
          jasmineCore.expect(field.firstChild.textContent).toBe('Test');
          jasmineCore.expect(field.firstElementChild.outerHTML).toBe('<input type="date" max="2030-10-10" min="2020-10-10">');
        });
      });
      jasmineCore.describe('Operations', function () {
        jasmineCore.afterEach(function () {
          view.hideEditor();
        });
        jasmineCore.describe('startEdit', function () {
          jasmineCore.it('With an initial date', function () {
            view = new RB.DateInlineEditorView({
              el: $container,
              rawValue: initialDate
            });
            view.render();
            view.startEdit();
            const field = view.$field[0];
            jasmineCore.expect(field.firstChild.tagName).toBe('INPUT');
            jasmineCore.expect(field.firstElementChild.tagName).toBe('INPUT');
            jasmineCore.expect(field.firstElementChild.value).toBe(initialDate);
          });
          jasmineCore.it('With no initial date', function () {
            view = new RB.DateInlineEditorView({
              el: $container
            });
            view.render();
            view.startEdit();
            const field = view.$field[0];
            jasmineCore.expect(field.firstChild.tagName).toBe('INPUT');
            jasmineCore.expect(field.firstElementChild.tagName).toBe('INPUT');
            jasmineCore.expect(field.firstElementChild.value).toBe('');
          });
          jasmineCore.it('With a descriptor text', function () {
            view = new RB.DateInlineEditorView({
              descriptorText: 'Test',
              el: $container
            });
            view.render();
            view.startEdit();
            const field = view.$field[0];
            jasmineCore.expect(field.firstChild.tagName).toBe(undefined);
            jasmineCore.expect(field.firstChild.textContent).toBe('Test');
            jasmineCore.expect(field.firstElementChild.tagName).toBe('INPUT');
            jasmineCore.expect(field.firstElementChild.value).toBe('');
          });
          jasmineCore.it('With a descriptor text and initial date', function () {
            view = new RB.DateInlineEditorView({
              descriptorText: 'Test',
              el: $container,
              rawValue: initialDate
            });
            view.render();
            view.startEdit();
            const field = view.$field[0];
            jasmineCore.expect(field.firstChild.tagName).toBe(undefined);
            jasmineCore.expect(field.firstChild.textContent).toBe('Test');
            jasmineCore.expect(field.firstElementChild.tagName).toBe('INPUT');
            jasmineCore.expect(field.firstElementChild.value).toBe(initialDate);
          });
        });
        jasmineCore.describe('save', function () {
          jasmineCore.it('With a new date', function () {
            view = new RB.DateInlineEditorView({
              el: $container
            });
            view.render();
            view.startEdit();
            view.setValue(initialDate);
            view.save();
            jasmineCore.expect(view.options.rawValue).toBe(initialDate);
            jasmineCore.expect(view.$el[0].innerHTML).toBe(initialDate);
          });
          jasmineCore.it('With an empty value', function () {
            view = new RB.DateInlineEditorView({
              el: $container,
              rawValue: initialDate
            });
            view.render();
            view.startEdit();
            view.setValue('');
            view.save();
            jasmineCore.expect(view.options.rawValue).toBe('');
            jasmineCore.expect(view.$el[0].innerHTML).toBe('');
          });
          jasmineCore.it('Without any changes made', function () {
            view = new RB.DateInlineEditorView({
              el: $container,
              rawValue: initialDate
            });
            view.render();
            view.startEdit();
            view.save();
            jasmineCore.expect(view.options.rawValue).toBe(initialDate);
            jasmineCore.expect(view.$el[0].innerHTML).toBe('');
          });
        });
      });
      jasmineCore.describe('Events', function () {
        jasmineCore.it('On change', function () {
          view = new RB.DateInlineEditorView({
            el: $container
          });
          jasmineCore.spyOn(view, '_scheduleUpdateDirtyState');
          view.render();
          view.$field.trigger('change');
          jasmineCore.expect(view._scheduleUpdateDirtyState).toHaveBeenCalled();
        });
      });
    });

    jasmineSuites.suite('rb/ui/views/DateTimeInlineEditorView', function () {
      const initialDateTime = '2022-09-16T03:45';
      let view;
      let $container;
      jasmineCore.beforeEach(function () {
        $container = $('<div>').appendTo($testsScratch);
      });
      jasmineCore.describe('Construction', function () {
        jasmineCore.it('Default', function () {
          view = new RB.DateTimeInlineEditorView({
            el: $container
          });
          view.render();
          jasmineCore.expect(view.$buttons.length).toBe(1);
          jasmineCore.expect(view.$field.length).toBe(1);
          const field = view.$field[0];
          jasmineCore.expect(field.children.length).toBe(1);
          jasmineCore.expect(field.firstElementChild.outerHTML).toBe('<input type="datetime-local">');
        });
        jasmineCore.it('With options provided', function () {
          view = new RB.DateTimeInlineEditorView({
            el: $container,
            maxDate: '2030-11-12T:06:30',
            minDate: '2020-10-10T15:20',
            rawValue: initialDateTime
          });
          view.render();
          jasmineCore.expect(view.options.minDate).toBe('2020-10-10T15:20');
          jasmineCore.expect(view.options.maxDate).toBe('2030-11-12T:06:30');
          jasmineCore.expect(view.options.rawValue).toBe(initialDateTime);
          jasmineCore.expect(view.$buttons.length).toBe(1);
          jasmineCore.expect(view.$field.length).toBe(1);
          const field = view.$field[0];
          jasmineCore.expect(field.firstElementChild.outerHTML).toBe(`<input type="datetime-local" max="2030-11-12T:06:30" \
min="2020-10-10T15:20">`);
        });
      });
      jasmineCore.describe('Operations', function () {
        jasmineCore.afterEach(function () {
          view.hideEditor();
        });
        jasmineCore.describe('startEdit', function () {
          jasmineCore.it('With an initial date', function () {
            view = new RB.DateTimeInlineEditorView({
              el: $container,
              rawValue: initialDateTime
            });
            view.render();
            view.startEdit();
            const field = view.$field[0];
            jasmineCore.expect(field.firstChild.tagName).toBe('INPUT');
            jasmineCore.expect(field.firstElementChild.tagName).toBe('INPUT');
            jasmineCore.expect(field.firstElementChild.value).toBe(initialDateTime);
          });
          jasmineCore.it('With no initial date', function () {
            view = new RB.DateTimeInlineEditorView({
              el: $container
            });
            view.render();
            view.startEdit();
            const field = view.$field[0];
            jasmineCore.expect(field.firstChild.tagName).toBe('INPUT');
            jasmineCore.expect(field.firstElementChild.tagName).toBe('INPUT');
            jasmineCore.expect(field.firstElementChild.value).toBe('');
          });
          jasmineCore.it('With a descriptor text', function () {
            view = new RB.DateTimeInlineEditorView({
              descriptorText: 'Test',
              el: $container
            });
            view.render();
            view.startEdit();
            const field = view.$field[0];
            jasmineCore.expect(field.firstChild.tagName).toBe(undefined);
            jasmineCore.expect(field.firstChild.textContent).toBe('Test');
            jasmineCore.expect(field.firstElementChild.tagName).toBe('INPUT');
            jasmineCore.expect(field.firstElementChild.value).toBe('');
          });
          jasmineCore.it('With a descriptor text and initial datetime', function () {
            view = new RB.DateTimeInlineEditorView({
              descriptorText: 'Test',
              el: $container,
              rawValue: initialDateTime
            });
            view.render();
            view.startEdit();
            const field = view.$field[0];
            jasmineCore.expect(field.firstChild.tagName).toBe(undefined);
            jasmineCore.expect(field.firstChild.textContent).toBe('Test');
            jasmineCore.expect(field.firstElementChild.tagName).toBe('INPUT');
            jasmineCore.expect(field.firstElementChild.value).toBe(initialDateTime);
          });
        });
        jasmineCore.describe('save', function () {
          jasmineCore.it('With a new date', function () {
            view = new RB.DateTimeInlineEditorView({
              el: $container
            });
            view.render();
            view.startEdit();
            view.setValue(initialDateTime);
            view.save();
            jasmineCore.expect(view.options.rawValue).toBe(initialDateTime);
            jasmineCore.expect(view.$el[0].innerHTML).toBe(initialDateTime);
          });
          jasmineCore.it('With an empty value', function () {
            view = new RB.DateTimeInlineEditorView({
              el: $container,
              rawValue: initialDateTime
            });
            view.render();
            view.startEdit();
            view.setValue('');
            view.save();
            jasmineCore.expect(view.options.rawValue).toBe('');
            jasmineCore.expect(view.$el[0].innerHTML).toBe('');
          });
          jasmineCore.it('Without any changes made', function () {
            view = new RB.DateTimeInlineEditorView({
              el: $container,
              rawValue: initialDateTime
            });
            view.render();
            view.startEdit();
            view.save();
            jasmineCore.expect(view.options.rawValue).toBe(initialDateTime);
            jasmineCore.expect(view.$el[0].innerHTML).toBe('');
          });
        });
      });
      jasmineCore.describe('Events', function () {
        jasmineCore.it('On change', function () {
          view = new RB.DateTimeInlineEditorView({
            el: $container
          });
          jasmineCore.spyOn(view, '_scheduleUpdateDirtyState');
          view.render();
          view.$field.trigger('change');
          jasmineCore.expect(view._scheduleUpdateDirtyState).toHaveBeenCalled();
        });
      });
    });

    jasmineSuites.suite('rb/ui/views/InlineEditorView', () => {
      let view;
      let $container;
      jasmineCore.beforeEach(() => {
        $container = $('<div>').appendTo($testsScratch);
      });
      jasmineCore.describe('Construction', () => {
        jasmineCore.it('Default', () => {
          view = new RB.InlineEditorView({
            el: $container
          });
          view.render();
          jasmineCore.expect(view.options.showEditIcon).toBe(true);
          jasmineCore.expect(view.$buttons.length).toBe(1);
          jasmineCore.expect(view.$field.length).toBe(1);
        });
        jasmineCore.it('With options', () => {
          view = new RB.InlineEditorView({
            el: $container,
            formClass: 'test-form',
            showEditIcon: false
          });
          view.render();
          jasmineCore.expect(view.options.showEditIcon).toBe(false);
          jasmineCore.expect(view.$buttons.length).toBe(1);
          jasmineCore.expect(view.$field.length).toBe(1);
          const field = view.$field[0];
          jasmineCore.expect(field.form.classList.contains('test-form')).toBe(true);
          jasmineCore.expect(field.outerHTML).toBe('<input type="text">');
        });
      });
      jasmineCore.describe('Operations', () => {
        jasmineCore.afterEach(() => {
          view.hideEditor();
        });
        jasmineCore.describe('startEdit', () => {
          jasmineCore.it('With an initial value', () => {
            view = new RB.InlineEditorView({
              el: $container,
              hasRawValue: true,
              rawValue: 'test'
            });
            view.render();
            view.startEdit();
            const field = view.$field[0];
            jasmineCore.expect(field.tagName).toBe('INPUT');
            jasmineCore.expect(field.value).toBe('test');
          });
          jasmineCore.it('With no initial value', () => {
            view = new RB.InlineEditorView({
              el: $container,
              hasRawValue: true
            });
            view.render();
            view.startEdit();
            const field = view.$field[0];
            jasmineCore.expect(field.tagName).toBe('INPUT');
            jasmineCore.expect(field.value).toBe('');
          });
        });
        jasmineCore.describe('save', () => {
          jasmineCore.it('With a new value', () => {
            view = new RB.InlineEditorView({
              el: $container,
              hasRawValue: true,
              rawValue: 'initial'
            });
            view.render();
            view.startEdit();
            let gotComplete = false;
            view.once('complete', (value, initialValue) => {
              jasmineCore.expect(value).toBe('test');
              jasmineCore.expect(initialValue).toBe('initial');
              gotComplete = true;
            });
            view.once('cancel', () => {
              jasmineCore.fail();
            });
            view.setValue('test');
            view.save();
            jasmineCore.expect(gotComplete).toBe(true);
          });
          jasmineCore.it('With an empty value', () => {
            view = new RB.InlineEditorView({
              el: $container,
              hasRawValue: true,
              rawValue: 'initial'
            });
            view.render();
            view.startEdit();
            let gotComplete = false;
            view.once('complete', (value, initialValue) => {
              jasmineCore.expect(value).toBe('');
              jasmineCore.expect(initialValue).toBe('initial');
              gotComplete = true;
            });
            view.once('cancel', () => {
              jasmineCore.fail();
            });
            view.setValue('');
            view.save();
            jasmineCore.expect(gotComplete).toBe(true);
          });
          jasmineCore.it('Without any changes made', () => {
            view = new RB.InlineEditorView({
              el: $container,
              hasRawValue: true,
              rawValue: 'initial'
            });
            view.render();
            view.startEdit();
            let gotCancel = false;
            view.once('complete', () => {
              jasmineCore.fail();
            });
            view.once('cancel', initialValue => {
              jasmineCore.expect(initialValue).toBe('initial');
              gotCancel = true;
            });
            view.save();
            jasmineCore.expect(gotCancel).toBe(true);
          });
          jasmineCore.it('With notifyUnchangedCompletion', () => {
            view = new RB.InlineEditorView({
              el: $container,
              hasRawValue: true,
              notifyUnchangedCompletion: true,
              rawValue: 'initial'
            });
            view.render();
            view.startEdit();
            let gotComplete = false;
            view.once('complete', (value, initialValue) => {
              jasmineCore.expect(value).toBe('initial');
              jasmineCore.expect(initialValue).toBe('initial');
              gotComplete = true;
            });
            view.once('cancel', () => {
              jasmineCore.fail();
            });
            view.save();
            jasmineCore.expect(gotComplete).toBe(true);
          });
          jasmineCore.it('With preventEvents', () => {
            view = new RB.InlineEditorView({
              el: $container,
              hasRawValue: true,
              rawValue: 'initial'
            });
            view.render();
            view.startEdit();
            view.once('complete', () => {
              jasmineCore.fail();
            });
            view.setValue('value');
            const value = view.save({
              preventEvents: true
            });
            jasmineCore.expect(value).toBe('value');
          });
          jasmineCore.it('With preventEvents and no change', () => {
            view = new RB.InlineEditorView({
              el: $container,
              hasRawValue: true,
              rawValue: 'initial'
            });
            view.render();
            view.startEdit();
            view.once('complete', () => {
              jasmineCore.fail();
            });
            const value = view.save({
              preventEvents: true
            });
            jasmineCore.expect(value).toBe(undefined);
          });
        });
      });
      jasmineCore.describe('Events', () => {
        jasmineCore.it('On keydown enter', () => {
          view = new RB.InlineEditorView({
            el: $container
          });
          jasmineCore.spyOn(view, 'submit');
          view.render();
          view.$field[0].dispatchEvent(new KeyboardEvent('keydown', {
            key: 'Enter'
          }));
          jasmineCore.expect(view.submit).toHaveBeenCalled();
        });
        jasmineCore.it('On keydown enter with multiline', () => {
          view = new RB.InlineEditorView({
            el: $container,
            multiline: true
          });
          jasmineCore.spyOn(view, 'submit');
          view.render();
          view.$field[0].dispatchEvent(new KeyboardEvent('keydown', {
            key: 'Enter'
          }));
          jasmineCore.expect(view.submit).not.toHaveBeenCalled();
        });
        jasmineCore.it('On keydown ctrl+enter with multiline', () => {
          view = new RB.InlineEditorView({
            el: $container,
            multiline: true
          });
          jasmineCore.spyOn(view, 'submit');
          view.render();
          view.$field[0].dispatchEvent(new KeyboardEvent('keydown', {
            ctrlKey: true,
            key: 'Enter'
          }));
          jasmineCore.expect(view.submit).toHaveBeenCalled();
        });
        jasmineCore.it('On keyup', () => {
          view = new RB.InlineEditorView({
            el: $container
          });
          jasmineCore.spyOn(view, '_scheduleUpdateDirtyState');
          view.render();
          view.$field[0].dispatchEvent(new KeyboardEvent('keyup', {
            key: 'A'
          }));
          jasmineCore.expect(view._scheduleUpdateDirtyState).toHaveBeenCalled();
        });
        jasmineCore.it('On cut', () => {
          view = new RB.InlineEditorView({
            el: $container
          });
          jasmineCore.spyOn(view, '_scheduleUpdateDirtyState');
          view.render();
          view.$field[0].dispatchEvent(new ClipboardEvent('cut'));
          jasmineCore.expect(view._scheduleUpdateDirtyState).toHaveBeenCalled();
        });
        jasmineCore.it('On paste', () => {
          view = new RB.InlineEditorView({
            el: $container
          });
          jasmineCore.spyOn(view, '_scheduleUpdateDirtyState');
          view.render();
          view.$field[0].dispatchEvent(new ClipboardEvent('paste'));
          jasmineCore.expect(view._scheduleUpdateDirtyState).toHaveBeenCalled();
        });
      });
    });

    jasmineSuites.suite('rb/ui/views/TextEditorView', function () {
      let view;
      jasmineCore.beforeEach(function () {
        RB.DnDUploader.create();
      });
      jasmineCore.afterEach(function () {
        RB.DnDUploader.instance = null;
      });
      jasmineCore.describe('Construction', function () {
        jasmineCore.it('Initial text', function () {
          view = new RB.TextEditorView({
            text: 'Test'
          });
          view.render();
          jasmineCore.expect(view.getText()).toBe('Test');
        });
        jasmineCore.describe('Text field wrapper', function () {
          jasmineCore.it('If plain text', function () {
            view = new RB.TextEditorView({
              richText: false
            });
            view.render();
            view.show();
            jasmineCore.expect(view.richText).toBe(false);
            jasmineCore.expect(view.$el.children('textarea').length).toBe(1);
            jasmineCore.expect(view.$el.children('.CodeMirror').length).toBe(0);
          });
          jasmineCore.it('If Markdown', function () {
            view = new RB.TextEditorView({
              richText: true
            });
            view.render();
            view.show();
            jasmineCore.expect(view.richText).toBe(true);
            jasmineCore.expect(view.$el.children('textarea').length).toBe(0);
            jasmineCore.expect(view.$el.children('.CodeMirror').length).toBe(1);
          });
        });
        jasmineCore.describe('Default richText', function () {
          jasmineCore.describe('If user default is true', function () {
            jasmineCore.beforeEach(function () {
              RB.UserSession.instance.set('defaultUseRichText', true);
            });
            jasmineCore.it('And richText unset', function () {
              view = new RB.TextEditorView();
              view.render();
              view.show();
              jasmineCore.expect(view.richText).toBe(true);
              jasmineCore.expect(view.$el.children('textarea').length).toBe(0);
              jasmineCore.expect(view.$el.children('.CodeMirror').length).toBe(1);
            });
            jasmineCore.it('And richText=true', function () {
              view = new RB.TextEditorView({
                richText: true
              });
              view.render();
              view.show();
              jasmineCore.expect(view.richText).toBe(true);
              jasmineCore.expect(view.$el.children('textarea').length).toBe(0);
              jasmineCore.expect(view.$el.children('.CodeMirror').length).toBe(1);
            });
            jasmineCore.it('And richText=false', function () {
              view = new RB.TextEditorView({
                richText: false
              });
              view.render();
              view.show();
              jasmineCore.expect(view.richText).toBe(true);
              jasmineCore.expect(view.$el.children('textarea').length).toBe(0);
              jasmineCore.expect(view.$el.children('.CodeMirror').length).toBe(1);
            });
          });
          jasmineCore.describe('If user default is false', function () {
            jasmineCore.beforeEach(function () {
              RB.UserSession.instance.set('defaultUseRichText', false);
            });
            jasmineCore.it('And richText unset', function () {
              view = new RB.TextEditorView();
              view.render();
              view.show();
              jasmineCore.expect(view.richText).toBe(false);
              jasmineCore.expect(view.$el.children('textarea').length).toBe(1);
              jasmineCore.expect(view.$el.children('.CodeMirror').length).toBe(0);
            });
            jasmineCore.it('And richText=true', function () {
              view = new RB.TextEditorView({
                richText: true
              });
              view.render();
              view.show();
              jasmineCore.expect(view.richText).toBe(true);
              jasmineCore.expect(view.$el.children('textarea').length).toBe(0);
              jasmineCore.expect(view.$el.children('.CodeMirror').length).toBe(1);
            });
            jasmineCore.it('And richText=false', function () {
              view = new RB.TextEditorView({
                richText: false
              });
              view.render();
              view.show();
              jasmineCore.expect(view.richText).toBe(false);
              jasmineCore.expect(view.$el.children('textarea').length).toBe(1);
              jasmineCore.expect(view.$el.children('.CodeMirror').length).toBe(0);
            });
          });
        });
      });
      jasmineCore.describe('Operations', function () {
        jasmineCore.describe('bindRichTextAttr', function () {
          let myModel;
          jasmineCore.beforeEach(function () {
            myModel = new Backbone.Model({
              richText: false
            });
            view = new RB.TextEditorView();
          });
          jasmineCore.it('Updates on change', function () {
            view.bindRichTextAttr(myModel, 'richText');
            jasmineCore.expect(view.richText).toBe(false);
            myModel.set('richText', true);
            jasmineCore.expect(view.richText).toBe(true);
          });
          jasmineCore.describe('Initial richText value', function () {
            jasmineCore.it('true', function () {
              myModel.set('richText', true);
              view.bindRichTextAttr(myModel, 'richText');
              jasmineCore.expect(view.richText).toBe(true);
            });
            jasmineCore.it('false', function () {
              myModel.set('richText', false);
              view.bindRichTextAttr(myModel, 'richText');
              jasmineCore.expect(view.richText).toBe(false);
            });
          });
        });
        jasmineCore.describe('bindRichTextCheckbox', function () {
          let $checkbox;
          jasmineCore.beforeEach(function () {
            $checkbox = $('<input type="checkbox">');
            view = new RB.TextEditorView();
            view.setRichText(false);
          });
          jasmineCore.it('Checkbox reflects richText', function () {
            view.bindRichTextCheckbox($checkbox);
            jasmineCore.expect($checkbox.prop('checked')).toBe(false);
            view.setRichText(true);
            jasmineCore.expect($checkbox.prop('checked')).toBe(true);
          });
          jasmineCore.describe('richText reflects checkbox', function () {
            jasmineCore.it('Checked', function () {
              view.setRichText(false);
              view.bindRichTextCheckbox($checkbox);
              $checkbox.prop('checked', true).triggerHandler('change');
              jasmineCore.expect(view.richText).toBe(true);
            });
            jasmineCore.it('Unchecked', function () {
              view.setRichText(true);
              view.bindRichTextCheckbox($checkbox);
              $checkbox.prop('checked', false).triggerHandler('change');
              jasmineCore.expect(view.richText).toBe(false);
            });
          });
          jasmineCore.describe('Initial checked state', function () {
            jasmineCore.it('richText=true', function () {
              view.setRichText(true);
              view.bindRichTextCheckbox($checkbox);
              jasmineCore.expect($checkbox.prop('checked')).toBe(true);
            });
            jasmineCore.it('richText=false', function () {
              view.setRichText(false);
              view.bindRichTextCheckbox($checkbox);
              jasmineCore.expect($checkbox.prop('checked')).toBe(false);
            });
          });
        });
        jasmineCore.describe('bindRichTextVisibility', function () {
          let $el;
          jasmineCore.beforeEach(function () {
            $el = $('<div>');
            view = new RB.TextEditorView();
            view.setRichText(false);
          });
          jasmineCore.describe('Initial visibility', function () {
            jasmineCore.it('richText=true', function () {
              $el.hide();
              view.setRichText(true);
              view.bindRichTextVisibility($el);

              /*
               * Chrome returns an empty string, while Firefox returns
               * "block".
               */
              const display = $el.css('display');
              jasmineCore.expect(display === 'block' || display === '').toBe(true);
            });
            jasmineCore.it('richText=false', function () {
              view.bindRichTextVisibility($el);
              jasmineCore.expect($el.css('display')).toBe('none');
            });
          });
          jasmineCore.describe('Toggles visibility on change', function () {
            jasmineCore.it('richText=true', function () {
              $el.hide();
              view.bindRichTextVisibility($el);
              jasmineCore.expect($el.css('display')).toBe('none');
              view.setRichText(true);
              /*
               * Chrome returns an empty string, while Firefox returns
               * "block".
               */
              const display = $el.css('display');
              jasmineCore.expect(display === 'block' || display === '').toBe(true);
            });
            jasmineCore.it('richText=false', function () {
              view.setRichText(true);
              view.bindRichTextVisibility($el);

              /*
               * Chrome returns an empty string, while Firefox returns
               * "block".
               */
              const display = $el.css('display');
              jasmineCore.expect(display === 'block' || display === '').toBe(true);
              view.setRichText(false);
              jasmineCore.expect($el.css('display')).toBe('none');
            });
          });
        });
        jasmineCore.describe('setRichText', function () {
          jasmineCore.it('Emits change:richText', function () {
            let emitted = false;
            view.on('change:richText', function () {
              emitted = true;
            });
            view.show();
            view.richText = false;
            view.setRichText(true);
            jasmineCore.expect(emitted).toBe(true);
          });
          jasmineCore.it('Emits change', function () {
            let emitted = false;
            view.on('change', function () {
              emitted = true;
            });
            view.show();
            view.richText = false;
            view.setRichText(true);
            jasmineCore.expect(emitted).toBe(true);
          });
          jasmineCore.it('Marks dirty', function () {
            view.show();
            view.richText = false;
            jasmineCore.expect(view.isDirty()).toBe(false);
            view.setRichText(true);
            jasmineCore.expect(view.isDirty()).toBe(true);
          });
          jasmineCore.describe('Markdown to Text', function () {
            jasmineCore.beforeEach(function () {
              view = new RB.TextEditorView({
                richText: true
              });
              view.render();
            });
            jasmineCore.it('If shown', function () {
              view.show();
              view.setRichText(false);
              jasmineCore.expect(view.richText).toBe(false);
              jasmineCore.expect(view.$el.children('textarea').length).toBe(1);
              jasmineCore.expect(view.$el.children('.CodeMirror').length).toBe(0);
            });
            jasmineCore.it('If hidden', function () {
              view.setRichText(false);
              jasmineCore.expect(view.richText).toBe(false);
              jasmineCore.expect(view.$el.children('textarea').length).toBe(0);
              jasmineCore.expect(view.$el.children('.CodeMirror').length).toBe(0);
            });
          });
          jasmineCore.describe('Text to Markdown', function () {
            jasmineCore.beforeEach(function () {
              view = new RB.TextEditorView({
                richText: false
              });
              view.render();
            });
            jasmineCore.it('If shown', function () {
              view.show();
              view.setRichText(true);
              jasmineCore.expect(view.richText).toBe(true);
              jasmineCore.expect(view.$el.children('textarea').length).toBe(0);
              jasmineCore.expect(view.$el.children('.CodeMirror').length).toBe(1);
            });
            jasmineCore.it('If hidden', function () {
              view.setRichText(true);
              jasmineCore.expect(view.richText).toBe(true);
              jasmineCore.expect(view.$el.children('textarea').length).toBe(0);
              jasmineCore.expect(view.$el.children('.CodeMirror').length).toBe(0);
            });
          });
        });
        jasmineCore.describe('setText', function () {
          jasmineCore.describe('If shown', function () {
            jasmineCore.it('If plain text', function () {
              view = new RB.TextEditorView({
                richText: false
              });
              view.show();
              view.setText('Test');
              jasmineCore.expect(view.$('textarea').val()).toBe('Test');
            });
            jasmineCore.it('If Markdown', function () {
              view = new RB.TextEditorView({
                richText: true
              });
              view.show();
              view.setText('Test');
              jasmineCore.expect(view._editor._codeMirror.getValue()).toBe('Test');
            });
          });
          jasmineCore.it('If hidden', function () {
            view = new RB.TextEditorView();
            view.setText('Test');
            jasmineCore.expect(view.getText()).toBe('Test');
          });
        });
        jasmineCore.describe('getText', function () {
          jasmineCore.it('If plain text', function () {
            view = new RB.TextEditorView({
              richText: false
            });
            view.show();
            view.setText('Test');
            jasmineCore.expect(view.getText()).toBe('Test');
          });
          jasmineCore.it('If Markdown', function () {
            view = new RB.TextEditorView({
              richText: true
            });
            view.show();
            view.setText('Test');
            jasmineCore.expect(view.getText()).toBe('Test');
          });
        });
        jasmineCore.describe('insertLine', function () {
          jasmineCore.it('If plain text', function () {
            view = new RB.TextEditorView({
              richText: false
            });
            view.show();
            view.setText('Test');
            view.insertLine('Test');
            jasmineCore.expect(view.getText()).toBe('Test\nTest');
          });
          jasmineCore.it('If Markdown', function () {
            view = new RB.TextEditorView({
              richText: true
            });
            view.show();
            view.setText('Test');
            view.insertLine('Test');
            jasmineCore.expect(view.getText()).toBe('Test\nTest');
          });
        });
        jasmineCore.describe('show', function () {
          jasmineCore.it('registers drop target if rich text', function () {
            jasmineCore.spyOn(RB.DnDUploader.instance, 'registerDropTarget');
            view = new RB.TextEditorView({
              richText: true
            });
            view.show();
            jasmineCore.expect(RB.DnDUploader.instance.registerDropTarget).toHaveBeenCalled();
          });
          jasmineCore.it('does not register drop target if plain text', function () {
            jasmineCore.spyOn(RB.DnDUploader.instance, 'registerDropTarget');
            view = new RB.TextEditorView({
              richText: false
            });
            view.show();
            jasmineCore.expect(RB.DnDUploader.instance.registerDropTarget).not.toHaveBeenCalled();
          });
        });
        jasmineCore.describe('hide', function () {
          jasmineCore.it('disables drop target', function () {
            jasmineCore.spyOn(RB.DnDUploader.instance, 'unregisterDropTarget');
            view = new RB.TextEditorView({
              richText: true
            });
            view.show();
            view.hide();
            jasmineCore.expect(RB.DnDUploader.instance.unregisterDropTarget).toHaveBeenCalled();
          });
        });
      });
      jasmineCore.describe('Drag and Drop', function () {
        jasmineCore.beforeEach(function () {
          view = new RB.TextEditorView({
            richText: true
          });
        });
        jasmineCore.describe('_isImage', function () {
          jasmineCore.it('correctly checks mimetype', function () {
            const file = {
              name: 'testimage.jpg',
              type: 'image/jpeg'
            };
            jasmineCore.expect(view._isImage(file)).toBe(true);
          });
          jasmineCore.it('checks filename extension', function () {
            const file = {
              name: 'testimage.jpg'
            };
            jasmineCore.expect(view._isImage(file)).toBe(true);
          });
          jasmineCore.it('returns false when given invalid type', function () {
            const file = {
              name: 'testimage.jps',
              type: 'application/json'
            };
            jasmineCore.expect(view._isImage(file)).toBe(false);
          });
        });
      });
      jasmineCore.describe('Markdown formatting toolbar', () => {
        jasmineCore.describe('Rich text', () => {
          jasmineCore.it('Enabled', () => {
            view = new RB.TextEditorView({
              richText: true
            });
            view.show();
            jasmineCore.expect(view.$('.rb-c-formatting-toolbar').length).toBe(1);
          });
          jasmineCore.it('Disabled', () => {
            view = new RB.TextEditorView({
              richText: false
            });
            view.show();
            jasmineCore.expect(view.$('.rb-c-formatting-toolbar').length).toBe(0);
          });
        });
        jasmineCore.describe('Buttons', () => {
          let codeMirror;
          jasmineCore.beforeEach(() => {
            view = new RB.TextEditorView({
              richText: true
            });
            view.show();
            codeMirror = view._editor._codeMirror;
          });
          jasmineCore.describe('Bold', () => {
            jasmineCore.it('Empty selection with no text toggles syntax', () => {
              jasmineCore.expect(codeMirror.getSelection()).toBe('');
              view.$('.rb-c-formatting-toolbar__btn-bold').click();
              jasmineCore.expect(view.getText()).toBe('****');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(2);
              view.$('.rb-c-formatting-toolbar__btn-bold').click();
              jasmineCore.expect(view.getText()).toBe('');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(0);
            });
            jasmineCore.it('Empty selection with cursor in unformatted text inserts syntax around text', () => {
              view.setText('Test');
              jasmineCore.expect(codeMirror.getSelection()).toBe('');
              view.$('.rb-c-formatting-toolbar__btn-bold').click();
              jasmineCore.expect(view.getText()).toBe('**Test**');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(6);
            });
            jasmineCore.it('Empty selection with cursor in formatted text removes syntax around text', () => {
              view.setText('**Test**');
              codeMirror.setSelection({
                ch: 2,
                line: 0
              }, {
                ch: 6,
                line: 0
              });
              jasmineCore.expect(codeMirror.getSelection()).toBe('Test');
              view.$('.rb-c-formatting-toolbar__btn-bold').click();
              jasmineCore.expect(view.getText()).toBe('Test');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(4);
            });
            jasmineCore.it('Unformatted text selection inserts syntax around text', () => {
              view.setText('Test');
              codeMirror.execCommand('selectAll');
              jasmineCore.expect(codeMirror.getSelection()).toBe('Test');
              view.$('.rb-c-formatting-toolbar__btn-bold').click();
              jasmineCore.expect(view.getText()).toBe('**Test**');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(8);
            });
            jasmineCore.it('Formatted text selection with only text removes syntax', () => {
              view.setText('**Test**');
              codeMirror.setSelection({
                ch: 2,
                line: 0
              }, {
                ch: 6,
                line: 0
              });
              jasmineCore.expect(codeMirror.getSelection()).toBe('Test');
              view.$('.rb-c-formatting-toolbar__btn-bold').click();
              jasmineCore.expect(view.getText()).toBe('Test');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(4);
            });
            jasmineCore.it('Formatted text selection including formatting removes syntax', () => {
              view.setText('**Test**');
              codeMirror.execCommand('selectAll');
              jasmineCore.expect(codeMirror.getSelection()).toBe('**Test**');
              view.$('.rb-c-formatting-toolbar__btn-bold').click();
              jasmineCore.expect(view.getText()).toBe('Test');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(4);
            });
          });
          jasmineCore.describe('Italic', () => {
            jasmineCore.it('Empty selection with no text toggles syntax', () => {
              jasmineCore.expect(codeMirror.getSelection()).toBe('');
              view.$('.rb-c-formatting-toolbar__btn-italic').click();
              jasmineCore.expect(view.getText()).toBe('__');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(1);
              view.$('.rb-c-formatting-toolbar__btn-italic').click();
              jasmineCore.expect(view.getText()).toBe('');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(0);
            });
            jasmineCore.it('Empty selection with cursor in unformatted text inserts syntax around text', () => {
              view.setText('Test');
              jasmineCore.expect(codeMirror.getSelection()).toBe('');
              view.$('.rb-c-formatting-toolbar__btn-italic').click();
              jasmineCore.expect(view.getText()).toBe('_Test_');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(5);
            });
            jasmineCore.it('Empty selection with cursor in formatted text removes syntax around text', () => {
              view.setText('_Test_');
              codeMirror.setSelection({
                ch: 1,
                line: 0
              }, {
                ch: 5,
                line: 0
              });
              jasmineCore.expect(codeMirror.getSelection()).toBe('Test');
              view.$('.rb-c-formatting-toolbar__btn-italic').click();
              jasmineCore.expect(view.getText()).toBe('Test');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(4);
            });
            jasmineCore.it('Unformatted text selection inserts syntax around text', () => {
              view.setText('Test');
              codeMirror.execCommand('selectAll');
              jasmineCore.expect(codeMirror.getSelection()).toBe('Test');
              view.$('.rb-c-formatting-toolbar__btn-italic').click();
              jasmineCore.expect(view.getText()).toBe('_Test_');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(6);
            });
            jasmineCore.it('Formatted text selection with only text removes syntax', () => {
              view.setText('_Test_');
              codeMirror.setSelection({
                ch: 1,
                line: 0
              }, {
                ch: 5,
                line: 0
              });
              jasmineCore.expect(codeMirror.getSelection()).toBe('Test');
              view.$('.rb-c-formatting-toolbar__btn-italic').click();
              jasmineCore.expect(view.getText()).toBe('Test');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(4);
            });
            jasmineCore.it('Formatted text selection including formatting removes syntax', () => {
              view.setText('_Test_');
              codeMirror.execCommand('selectAll');
              jasmineCore.expect(codeMirror.getSelection()).toBe('_Test_');
              view.$('.rb-c-formatting-toolbar__btn-italic').click();
              jasmineCore.expect(view.getText()).toBe('Test');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(4);
            });
          });
          jasmineCore.describe('Strikethrough', () => {
            jasmineCore.it('Empty selection with no text toggles syntax', () => {
              jasmineCore.expect(codeMirror.getSelection()).toBe('');
              view.$('.rb-c-formatting-toolbar__btn-strikethrough').click();
              jasmineCore.expect(view.getText()).toBe('~~~~');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(2);
              view.$('.rb-c-formatting-toolbar__btn-strikethrough').click();
              jasmineCore.expect(view.getText()).toBe('');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(0);
            });
            jasmineCore.it('Empty selection with cursor in unformatted text inserts syntax around text', () => {
              view.setText('Test');
              jasmineCore.expect(codeMirror.getSelection()).toBe('');
              view.$('.rb-c-formatting-toolbar__btn-strikethrough').click();
              jasmineCore.expect(view.getText()).toBe('~~Test~~');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(6);
            });
            jasmineCore.it('Empty selection with cursor in formatted text removes syntax around text', () => {
              view.setText('~~Test~~');
              codeMirror.setSelection({
                ch: 2,
                line: 0
              }, {
                ch: 6,
                line: 0
              });
              jasmineCore.expect(codeMirror.getSelection()).toBe('Test');
              view.$('.rb-c-formatting-toolbar__btn-strikethrough').click();
              jasmineCore.expect(view.getText()).toBe('Test');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(4);
            });
            jasmineCore.it('Unformatted text selection inserts syntax around text', () => {
              view.setText('Test');
              codeMirror.execCommand('selectAll');
              jasmineCore.expect(codeMirror.getSelection()).toBe('Test');
              view.$('.rb-c-formatting-toolbar__btn-strikethrough').click();
              jasmineCore.expect(view.getText()).toBe('~~Test~~');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(8);
            });
            jasmineCore.it('Formatted text selection with only text removes syntax', () => {
              view.setText('~~Test~~');
              codeMirror.setSelection({
                ch: 2,
                line: 0
              }, {
                ch: 6,
                line: 0
              });
              jasmineCore.expect(codeMirror.getSelection()).toBe('Test');
              view.$('.rb-c-formatting-toolbar__btn-strikethrough').click();
              jasmineCore.expect(view.getText()).toBe('Test');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(4);
            });
            jasmineCore.it('Formatted text selection including formatting removes syntax', () => {
              view.setText('~~Test~~');
              codeMirror.execCommand('selectAll');
              jasmineCore.expect(codeMirror.getSelection()).toBe('~~Test~~');
              view.$('.rb-c-formatting-toolbar__btn-strikethrough').click();
              jasmineCore.expect(view.getText()).toBe('Test');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(4);
            });
          });
          jasmineCore.describe('Code', () => {
            jasmineCore.it('Empty selection with no text toggles syntax', () => {
              jasmineCore.expect(codeMirror.getSelection()).toBe('');
              view.$('.rb-c-formatting-toolbar__btn-code').click();
              jasmineCore.expect(view.getText()).toBe('``');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(1);
              view.$('.rb-c-formatting-toolbar__btn-code').click();
              jasmineCore.expect(view.getText()).toBe('');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(0);
            });
            jasmineCore.it('Empty selection with cursor in unformatted text inserts syntax around text', () => {
              view.setText('Test');
              jasmineCore.expect(codeMirror.getSelection()).toBe('');
              view.$('.rb-c-formatting-toolbar__btn-code').click();
              jasmineCore.expect(view.getText()).toBe('`Test`');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(5);
            });
            jasmineCore.it('Empty selection with cursor in formatted text removes syntax around text', () => {
              view.setText('`Test`');
              codeMirror.setSelection({
                ch: 1,
                line: 0
              }, {
                ch: 5,
                line: 0
              });
              jasmineCore.expect(codeMirror.getSelection()).toBe('Test');
              view.$('.rb-c-formatting-toolbar__btn-code').click();
              jasmineCore.expect(view.getText()).toBe('Test');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(4);
            });
            jasmineCore.it('Unformatted text selection inserts syntax around text', () => {
              view.setText('Test');
              codeMirror.execCommand('selectAll');
              jasmineCore.expect(codeMirror.getSelection()).toBe('Test');
              view.$('.rb-c-formatting-toolbar__btn-code').click();
              jasmineCore.expect(view.getText()).toBe('`Test`');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(6);
            });
            jasmineCore.it('Formatted text selection with only text removes syntax', () => {
              view.setText('`Test`');
              codeMirror.setSelection({
                ch: 1,
                line: 0
              }, {
                ch: 5,
                line: 0
              });
              jasmineCore.expect(codeMirror.getSelection()).toBe('Test');
              view.$('.rb-c-formatting-toolbar__btn-code').click();
              jasmineCore.expect(view.getText()).toBe('Test');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(4);
            });
            jasmineCore.it('Formatted text selection including formatting removes syntax', () => {
              view.setText('`Test`');
              codeMirror.execCommand('selectAll');
              jasmineCore.expect(codeMirror.getSelection()).toBe('`Test`');
              view.$('.rb-c-formatting-toolbar__btn-code').click();
              jasmineCore.expect(view.getText()).toBe('Test');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(4);
            });
          });
          jasmineCore.describe('Unordered list', () => {
            jasmineCore.it('Empty selection with no text toggles syntax', () => {
              jasmineCore.expect(codeMirror.getSelection()).toBe('');
              view.$('.rb-c-formatting-toolbar__btn-list-ul').click();
              jasmineCore.expect(view.getText()).toBe('- ');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(2);
              view.$('.rb-c-formatting-toolbar__btn-list-ul').click();
              jasmineCore.expect(view.getText()).toBe('');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(0);
            });
            jasmineCore.it('Empty selection with cursor in text toggles syntax', () => {
              view.setText('Test');
              codeMirror.setCursor({
                ch: 2,
                line: 0
              });
              view.$('.rb-c-formatting-toolbar__btn-list-ul').click();
              jasmineCore.expect(view.getText()).toBe('- Test');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(4);
              view.$('.rb-c-formatting-toolbar__btn-list-ul').click();
              jasmineCore.expect(view.getText()).toBe('Test');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(2);
            });
            jasmineCore.it('Unformatted text selection toggles syntax', () => {
              view.setText('Test');
              codeMirror.execCommand('selectAll');
              view.$('.rb-c-formatting-toolbar__btn-list-ul').click();
              jasmineCore.expect(view.getText()).toBe('- Test');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(6);
              codeMirror.execCommand('selectAll');
              view.$('.rb-c-formatting-toolbar__btn-list-ul').click();
              jasmineCore.expect(view.getText()).toBe('Test');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(4);
            });
            jasmineCore.it('Formatted text selection with only text removes syntax', () => {
              view.setText('- Test');
              codeMirror.setSelection({
                ch: 2,
                line: 0
              }, {
                ch: 6,
                line: 0
              });
              jasmineCore.expect(codeMirror.getSelection()).toBe('Test');
              view.$('.rb-c-formatting-toolbar__btn-list-ul').click();
              jasmineCore.expect(view.getText()).toBe('Test');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(4);
            });
            jasmineCore.it('Formatted text selection including formatting removes syntax', () => {
              view.setText('- Test');
              codeMirror.execCommand('selectAll');
              jasmineCore.expect(codeMirror.getSelection()).toBe('- Test');
              view.$('.rb-c-formatting-toolbar__btn-list-ul').click();
              jasmineCore.expect(view.getText()).toBe('Test');
              jasmineCore.expect(codeMirror.getSelection()).toBe('Test');
            });
            jasmineCore.it('Lines with multiple text groups get syntax added to beginning of the line', () => {
              view.setText('Test more text');
              codeMirror.setCursor({
                ch: 6,
                line: 0
              });
              view.$('.rb-c-formatting-toolbar__btn-list-ul').click();
              jasmineCore.expect(view.getText()).toBe('- Test more text');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(8);
            });
          });
          jasmineCore.describe('Ordered list', () => {
            jasmineCore.it('Empty selection with no text toggles syntax', () => {
              jasmineCore.expect(codeMirror.getSelection()).toBe('');
              view.$('.rb-c-formatting-toolbar__btn-list-ol').click();
              jasmineCore.expect(view.getText()).toBe('1. ');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(3);
              view.$('.rb-c-formatting-toolbar__btn-list-ol').click();
              jasmineCore.expect(view.getText()).toBe('');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(0);
            });
            jasmineCore.it('Empty selection with cursor in text toggles syntax', () => {
              view.setText('Test');
              codeMirror.setCursor({
                ch: 2,
                line: 0
              });
              view.$('.rb-c-formatting-toolbar__btn-list-ol').click();
              jasmineCore.expect(view.getText()).toBe('1. Test');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(5);
              view.$('.rb-c-formatting-toolbar__btn-list-ol').click();
              jasmineCore.expect(view.getText()).toBe('Test');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(2);
            });
            jasmineCore.it('Unformatted text selection toggles syntax', () => {
              view.setText('Test');
              codeMirror.execCommand('selectAll');
              view.$('.rb-c-formatting-toolbar__btn-list-ol').click();
              jasmineCore.expect(view.getText()).toBe('1. Test');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(7);
              codeMirror.execCommand('selectAll');
              view.$('.rb-c-formatting-toolbar__btn-list-ol').click();
              jasmineCore.expect(view.getText()).toBe('Test');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(4);
            });
            jasmineCore.it('Formatted text selection with only text removes syntax', () => {
              view.setText('1. Test');
              codeMirror.setSelection({
                ch: 3,
                line: 0
              }, {
                ch: 7,
                line: 0
              });
              jasmineCore.expect(codeMirror.getSelection()).toBe('Test');
              view.$('.rb-c-formatting-toolbar__btn-list-ol').click();
              jasmineCore.expect(view.getText()).toBe('Test');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(4);
            });
            jasmineCore.it('Formatted text selection including formatting removes syntax', () => {
              view.setText('1. Test');
              codeMirror.execCommand('selectAll');
              jasmineCore.expect(codeMirror.getSelection()).toBe('1. Test');
              view.$('.rb-c-formatting-toolbar__btn-list-ol').click();
              jasmineCore.expect(view.getText()).toBe('Test');
              jasmineCore.expect(codeMirror.getSelection()).toBe('Test');
            });
            jasmineCore.it('Lines with multiple text groups get syntax added to beginning of the line', () => {
              view.setText('Test more text');
              codeMirror.setCursor({
                ch: 6,
                line: 0
              });
              view.$('.rb-c-formatting-toolbar__btn-list-ol').click();
              jasmineCore.expect(view.getText()).toBe('1. Test more text');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(9);
            });
          });
          jasmineCore.describe('Link', () => {
            jasmineCore.it('Empty selection with no text toggles syntax', () => {
              jasmineCore.expect(codeMirror.getSelection()).toBe('');
              view.$('.rb-c-formatting-toolbar__btn-link').click();
              jasmineCore.expect(view.getText()).toBe('[](url)');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(1);
              view.$('.rb-c-formatting-toolbar__btn-link').click();
              jasmineCore.expect(view.getText()).toBe('');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(0);
            });
            jasmineCore.it('Empty selection with cursor in text toggles syntax', () => {
              view.setText('Test');
              codeMirror.setCursor({
                ch: 2,
                line: 0
              });
              view.$('.rb-c-formatting-toolbar__btn-link').click();
              jasmineCore.expect(view.getText()).toBe('[Test](url)');
              jasmineCore.expect(codeMirror.getSelection()).toBe('url');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(10);
              view.$('.rb-c-formatting-toolbar__btn-link').click();
              jasmineCore.expect(view.getText()).toBe('Test');
              jasmineCore.expect(codeMirror.getSelection()).toBe('');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(4);
            });
            jasmineCore.it('Unformatted text selection toggles syntax', () => {
              view.setText('Test');
              codeMirror.execCommand('selectAll');
              view.$('.rb-c-formatting-toolbar__btn-link').click();
              jasmineCore.expect(view.getText()).toBe('[Test](url)');
              jasmineCore.expect(codeMirror.getSelection()).toBe('url');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(10);
              view.$('.rb-c-formatting-toolbar__btn-link').click();
              jasmineCore.expect(view.getText()).toBe('Test');
              jasmineCore.expect(codeMirror.getSelection()).toBe('');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(4);
            });
            jasmineCore.it('Formatted text selection with only text removes syntax', () => {
              view.setText('[Test](example.com)');
              codeMirror.setSelection({
                ch: 1,
                line: 0
              }, {
                ch: 5,
                line: 0
              });
              jasmineCore.expect(codeMirror.getSelection()).toBe('Test');
              view.$('.rb-c-formatting-toolbar__btn-link').click();
              jasmineCore.expect(view.getText()).toBe('Test');
              jasmineCore.expect(codeMirror.getSelection()).toBe('');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(4);
            });
            jasmineCore.it('Formatted text selection including formatting removes syntax', () => {
              view.setText('[Test](example.com)');
              codeMirror.execCommand('selectAll');
              jasmineCore.expect(codeMirror.getSelection()).toBe('[Test](example.com)');
              view.$('.rb-c-formatting-toolbar__btn-link').click();
              jasmineCore.expect(view.getText()).toBe('Test');
              jasmineCore.expect(codeMirror.getSelection()).toBe('');
              jasmineCore.expect(codeMirror.getCursor().ch).toBe(4);
            });
          });
        });
      });
    });

}));
//# sourceMappingURL=index.js.map
