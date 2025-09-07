/**
 * 如果有多个算法需要切换，那么用策略模式
 * 策略接口
 * 实现策略接口的具体策略
 * context 策略上下文，由其决定使用哪个策略
 */

interface DiscountStrategy {
  calculate(price: number): number;
}

class NoDiscountStrategy implements DiscountStrategy {
  calculate(price: number): number {
    return price;
  }
}

class PercentageDiscountStrategy implements DiscountStrategy {
  constructor(private readonly percentage: number) {}
  calculate(price: number): number {
    return price * (1 - this.percentage / 100);
  }
}

class FixedDiscountStrategy implements DiscountStrategy {
  constructor(private readonly discountAmount: number) {}
  calculate(price: number): number {
    return Math.max(0, price - this.discountAmount);
  }
}

class ShoppingCart {
  private strategy: DiscountStrategy = new NoDiscountStrategy();
  setDiscountStrategy(strategy: DiscountStrategy) {
    this.strategy = strategy;
  }
  checkout(price: number) {
    return this.strategy.calculate(price);
  }
}

// 使用示例
const cart = new ShoppingCart();

// 使用无折扣
console.log("无折扣:", cart.checkout(100)); // 100

// 切换到百分比折扣
cart.setDiscountStrategy(new PercentageDiscountStrategy(20));
console.log("20%折扣:", cart.checkout(100)); // 80

// 切换到固定折扣
cart.setDiscountStrategy(new FixedDiscountStrategy(30));
console.log("减30元:", cart.checkout(100)); // 70
