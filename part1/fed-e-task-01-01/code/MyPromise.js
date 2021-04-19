/*
尽可能还原 Promise 中的每一个 API, 并通过注释的方式描述思路和原理.
*/

const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";
class MyPromise {
    constructor(executor) {
        try {
            executor(this.resove, this.reject);
        } catch (e) {
            this.reject(e)
        }
    }
    // * 初始状态为pending
    state = PENDING;
    
    // * 用于保存成功的value
    value = undefined;
    // * 用于保存失败的reason
    reason = undefined;
    // * 允许多次调用then, 但是在状态变为resolved的时候才执行, 因此采用一个数组存放所有的then正确回调和错误回调
    successedCallback = [];
    failedCallback = [];

    resolve = (value) => {
        // * 防止重复更新状态, promise的状态只能更改一次
        if (state === PENDING) {
            this.state = RESOLVED;
            this.value = value;
            // * 当状态变为resolve的时候, 执行所有正确的回调
            while(this.successedCallback.length) {
                // * 相当于一个队列, 先进先出, 因此这里也按顺序执行
                this.successedCallback.shift()();
            }
        }
    }

    reject = (reason) => {
        if (state === PENDING) {
            this.state = REJECTED;
            this.value = value;
            while(this.failedCallback.length) {
                this.failedCallback.shift()();
            }
        }
    }

    then (successCallback, failCallback) {
        // * then中首先需要对参数做判断, 看参数是不是函数, 如果不是, 则需要转换成一个函数, 类似一个默认参数
        successCallback = typeof successCallback === 'function' ? successCallback : v => v;
        failCallback = typeof failCallback === 'function' ? failCallback : err => new Error(err);
        // * 由于promise中then的返回值也是一个promise对象, 但是他不能等于自己(禁止then的回调结果执行后等于自己的返回值), 因此需要使用一个辅助函数, 对其返回值做判断
        // * 同时successCallback并不是立即执行的, 他是一个异步的过程, 因此需要使用一个异步处理, 此处采用setTimeout, 实际上应该使用微队列
        let prmise2 = new MyPromise((resolve, reject) => {
            if (this.state === RESOLVED) {
                setTimeout(() => {
                    // * 如果状态是成功直接执行正确的那一个回调(比如promise中没有异步操作), 
                    // * then中第一个回调需要拿到上一次resolve的value
                    let x = successCallback(this.value);
                    // * 利用辅助函数判断是否是同一个promise
                    this.resolvePromise(promise2, x, resolve, reject);
                });
            } else if (this.state === REJECTED) {
                // * 和成功状态的处理一致, 只不过处理失败的状态
                setTimeout(() => {
                    let x = failCallback(this.reason);
                    this.resolvePromise(promise2, x, resolve, reject);
                });
            } else if (this.state === PENDING) {
                // * 如果promise中存在异步操作，这里就是pending, 就需要将then中回调延迟挂载到异步队列中
                this.successedCallback.push(() => {
                    setTimeout(() => {
                        let x = successCallback(this.value);
                        this.resolvePromise(promise2, x, resolve, reject);
                    })
                });
                this.failedCallback.push(() => {
                    setTimeout(() => {
                        let x = failCallback(this.reason);
                        this.resolvePromise(promise2, x, resolve, reject);
                    })
                });
            }
        });
        
        return promise2; // * 将其返回出去, 用以支持链式调用

    }

    resolvePromise(promise2, x, resolve, reject) {
        // * 由于then中要返回一个新的promise, 但是这个promise不能等于自己, 因此第一步要判断是否是自己, 是则抛错
        if (promise2 === x) {
            return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
        }
        // TODO 是否是一个promise, 是promise则需要根据返回结果来确定是调用resolve还是reject
        // TODO 如果是普通值, 则直接使用resolve返回
        if (x instanceof MyPromise) {
            x.then(resolve, reject);
        } else {
            resolve(x);
        }
    }

    static resolve(value) {
        // * resolve静态函数可以直接返回一个新的promise, 同时状态是成功
        if (value instanceof MyPromise) return;
        return new MyPromise(resolve => resolve(value));
    }

    static reject(reason) {
        // * 和resolve静态函数类似
        if (value instanceof MyPromise) return;
        return new MyPromise(undefined, reject => reject(reason));
    }
    
    static all(promiseArr) {
        // * All函数接收一系列promise数组或者是原始值, 然后按顺序返回出来
        // * 为了保障异步执行, 需要使用一个变量的控制是否执行完, 一定要等待全部执行完, 才能返回, 返回值也是一个promise, 支持链式调用
        let res = [];
        let index = 0;
        let addData = function(key, value, resolve) {
            res[key] = value; // * 保证返回值的顺序
            index++;
            if (index === promiseArr.length) {
                // * 说明执行完了, 此时执行resolve
                resolve(res);
            }
        }
        return new MyPromise((resolve, reject) => {
            for (let i = 0; i < promiseArr.length; i++) {
                const current = promiseArr[i];
                if (current instanceof MyPromise) {
                    // * 当前值是promise
                    current.then(value => addData(i, value, resolve), err => {
                        // * 只要有一个报错，则直接返回错误信息
                        reject(err);
                    });
                } else {
                    // * 普通值
                    addData(i, current, resolve);
                }
            }
        })
    }

    static race(promiseAll) {
        // * 和promise.all 类似, 但是只返回最先执行完成的
        let res = undefined;
        function addData (value, resolve) {
            res = value;
            resolve(res)
        }
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promiseAll.length; i++) {
                const current = promiseAll[i]
                if (current instanceof MyPromise) {
                    current.then(value => addData(value, resolve), err => {
                        reject(err);
                    })
                } else {
                    addData(current, resolve);
                }
            }
        })
    }

    static allSettled(promiseALl) {
        let res = [];
        let index = 0;
        let addData = function(key, value, resolve, status) {
            if (status === RESOLVED) {
                res[key] = {
                    status: 'fulfilled',
                    value: value
                }
            } else {
                res[key] = {
                    status: 'rejected',
                    reason: value
                }
            }
            index++;
            if (index === promiseArr.length) {
                // * 说明执行完了, 此时执行resolve
                resolve(res);
            }
        }
        return new MyPromise((resolve, reject) => {
            for (let i = 0; i < promiseArr.length; i++) {
                const current = promiseArr[i];
                if (current instanceof MyPromise) {
                    // * 当前值是promise
                    current.then(value => addData(i, value, resolve, RESOLVED), err => {
                        // * 有错误也添加到数组中, 无状态返回一组执行结果数组
                        addData(i, value, resolve, REJECTED);
                    });
                } else {
                    // * 普通值
                    addData(i, current, resolve, RESOLVED);
                }
            }
        })
    }

    finally(callback) {
        return this.then(value => {
            // 执行callback, 并且返回回调函数的执行结果
            return MyPromise.resolve(callback()).then(() => value);
        }, err => {
            // 对于错误的回调, 则返回错误信息
            return MyPromise.resolve(callback()).then(() => err);
        });
    }

    catch(callback) {
        // * catch实际上就是第一个参数为undefined的then方法
        return this.then(undefined, callback);
    }
}