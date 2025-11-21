# Andes Design System - Tokens

Master design tokens and foundation styles extracted from the Andes Design System. This CSS file contains all the core design elements that can be applied to any project to maintain consistency with the Mercado Livre design language.

## Features

- **CSS Variables**: All core design tokens as CSS variables
- **Component Classes**: Ready-to-use component classes following Andes patterns
- **Responsive Design**: Includes responsive breakpoints and patterns
- **Accessibility**: Built with accessibility considerations

## Installation

Include the CSS file in your project:

```html
<link rel="stylesheet" href="./andes-design-tokens.css">
```

## Design Tokens

### Colors

#### Institutional Colors
- `--andes-primary`: `#ffe600` (Yellow ML)
- `--andes-primary-dark`: `#e6cf00`
- `--andes-secondary`: `#3483fa` (Action Blue)
- `--andes-secondary-dark`: `#2968c8`
- `--andes-success`: `#00a650` (Green)
- `--andes-warning`: `#ff7733` (Orange)
- `--andes-error`: `#f23d4f` (Red)
- `--andes-purple-meli`: `#8e24aa` (Meli+ Purple)

#### Neutral Colors
- `--andes-neutral-0`: `#ffffff` (White)
- `--andes-neutral-100`: `#f5f5f0`
- `--andes-neutral-200`: `#ebebeb` (Border/Divider)
- `--andes-neutral-300`: `#e6e6e6`
- `--andes-neutral-600`: `#999999` (Weak text)
- `--andes-neutral-800`: `#333333` (Strong text)
- `--andes-neutral-900`: `#000000` (Black)

### Typography
- `--andes-font-family`: `'Roboto', sans-serif`
- `--andes-font-size-xs`: `12px`
- `--andes-font-size-s`: `14px`
- `--andes-font-size-m`: `16px`
- `--andes-font-size-l`: `18px`
- `--andes-font-size-xl`: `24px`
- `--andes-font-size-xxl`: `32px`

### Spacing & Borders
- `--andes-radius-s`: `4px`
- `--andes-radius-m`: `6px`
- `--andes-radius-l`: `8px`
- `--andes-radius-pill`: `2rem`
- `--andes-shadow-sm`: `0 1px 2px 0 rgba(0,0,0,.1)`
- `--andes-shadow-md`: `0 4px 8px 0 rgba(0,0,0,.12)`
- `--andes-transition`: `all .2s ease`

### Spacing System
- `--andes-spacing-xs`: `4px`
- `--andes-spacing-s`: `8px`
- `--andes-spacing-m`: `12px`
- `--andes-spacing-l`: `16px`
- `--andes-spacing-xl`: `20px`
- `--andes-spacing-xxl`: `24px`
- `--andes-spacing-xxxl`: `32px`

## Components

### Buttons

```html
<button class="andes-button andes-button--primary">Primary Button</button>
<button class="andes-button andes-button--action">Action Button</button>
<button class="andes-button andes-button--transparent">Transparent Button</button>
<button class="andes-button andes-button--link">Link Button</button>
<button class="andes-button andes-button--full">Full Width Button</button>
```

### Badges

```html
<span class="andes-badge andes-badge--promo">15% OFF</span>
<span class="andes-badge andes-badge--full">⚡ FULL</span>
<span class="andes-badge andes-badge--bestseller">1º MAIS VENDIDO</span>
<span class="andes-badge andes-badge--new">NOVO</span>
```

### Cards

```html
<div class="andes-card">
  <!-- Card content -->
</div>

<div class="andes-card andes-card--flat">
  <!-- Flat card without shadow -->
</div>

<div class="andes-card andes-card--animated">
  <!-- Animated card with hover effect -->
</div>
```

### Typography

```html
<p class="andes-typography andes-typography--size-m andes-typography--weight-medium">
  Medium weight typography
</p>
```

## Usage Examples

### Simple Button Component
```html
<button class="andes-button andes-button--primary">
  Submit
</button>
```

### Product Card
```html
<div class="andes-card grid-card">
  <div class="grid-card__img">
    <img src="product-image.jpg" alt="Product">
  </div>
  <div class="grid-card__content">
    <div class="grid-card__title">Product Title</div>
    <div class="andes-money" style="font-size: 20px;">
      <span class="andes-money__symbol">R$</span>
      <span class="andes-money__fraction">99</span>
      <span class="andes-money__cents">90</span>
    </div>
  </div>
</div>
```

### Money Display
```html
<div class="andes-money">
  <span class="andes-money__symbol">R$</span>
  <span class="andes-money__fraction">129</span>
  <span class="andes-money__cents">90</span>
  <span class="andes-money-discount">10% OFF</span>
</div>
```

## Best Practices

1. Always use design tokens over hardcoded values
2. Use component classes for consistency
3. Follow the spacing system for visual harmony
4. Respect the color system for accessibility
5. Maintain proper contrast ratios

## Contributing

This design system is maintained based on the official Andes Design System guidelines from Mercado Livre. For changes, follow the established patterns and ensure visual consistency across all components.

## License

This design system is based on Mercado Livre's Andes Design System and is intended for educational purposes.