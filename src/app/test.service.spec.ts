import { fakeAsync, tick } from '@angular/core/testing';

class TestService {
  constructor(private dependency: any) {}

  doSomething() {
    this.dependency.getPromise().then(() => this.dependency.run());
  }
}

describe('TestService', () => {
  let dependency;
  let testService: TestService;

  beforeEach(() => {
    dependency = {
      run: jest.fn(),
      getPromise: jest.fn()
    };
    testService = new TestService(dependency);
  });

  it('this fails', fakeAsync(() => {
    dependency.getPromise.mockResolvedValue('arbitrary');

    testService.doSomething();
    tick();

    expect(dependency.run).toHaveBeenCalled();
  }));

  it('this passes', fakeAsync(() => {
    dependency.getPromise.mockImplementation(() => Promise.resolve('arbitrary'));

    testService.doSomething();
    tick();

    expect(dependency.run).toHaveBeenCalled();
  }));
});
