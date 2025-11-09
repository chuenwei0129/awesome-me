"use strict";(self.webpackChunk_c6i_playground=self.webpackChunk_c6i_playground||[]).push([[34],{10034:function(t,n,a){a.r(n),a.d(n,{texts:function(){return e}});const e=[{value:"CVA (Class Variance Authority)",paraId:0,tocIndex:1},{value:" \u662F\u4E00\u4E2A\u7528\u4E8E\u7BA1\u7406\u7EC4\u4EF6\u6837\u5F0F\u53D8\u4F53\u7684 TypeScript \u5E93\u3002\u5B83\u63D0\u4F9B\u4E86\u4E00\u79CD\u7ED3\u6784\u5316\u3001\u7C7B\u578B\u5B89\u5168\u7684\u65B9\u5F0F\u6765\u5B9A\u4E49\u548C\u7BA1\u7406\u7EC4\u4EF6\u7684\u5404\u79CD\u53D8\u4F53\uFF08variants\uFF09\u3001\u5C3A\u5BF8\uFF08sizes\uFF09\u3001\u72B6\u6001\u7B49\u6837\u5F0F\u7EC4\u5408\u3002",paraId:0,tocIndex:1},{value:"CVA \u672C\u8D28\u4E0A\u662F\u5BF9 ",paraId:1,tocIndex:1},{value:"clsx",paraId:1,tocIndex:1},{value:" \u548C ",paraId:1,tocIndex:1},{value:"tailwind-merge",paraId:1,tocIndex:1},{value:" \u7684\u9AD8\u7EA7\u5C01\u88C5\uFF0C\u901A\u8FC7\u58F0\u660E\u5F0F\u7684\u914D\u7F6E\u6765\u7BA1\u7406\u590D\u6742\u7684\u6837\u5F0F\u903B\u8F91\u3002",paraId:1,tocIndex:1},{value:`import { cva } from 'class-variance-authority';

const button = cva('\u57FA\u7840\u6837\u5F0F', {
  variants: {
    // \u53D8\u4F53\u7EF4\u5EA6 1
    intent: {
      primary: '\u4E3B\u8981\u6837\u5F0F',
      secondary: '\u6B21\u8981\u6837\u5F0F',
    },
    // \u53D8\u4F53\u7EF4\u5EA6 2
    size: {
      small: '\u5C0F\u5C3A\u5BF8\u6837\u5F0F',
      large: '\u5927\u5C3A\u5BF8\u6837\u5F0F',
    },
  },
  // \u590D\u5408\u53D8\u4F53\uFF1A\u5F53\u591A\u4E2A\u53D8\u4F53\u540C\u65F6\u5B58\u5728\u65F6\u7684\u7279\u6B8A\u6837\u5F0F
  compoundVariants: [
    {
      intent: 'primary',
      size: 'large',
      class: '\u7279\u6B8A\u7EC4\u5408\u6837\u5F0F',
    },
  ],
  // \u9ED8\u8BA4\u53D8\u4F53
  defaultVariants: {
    intent: 'primary',
    size: 'small',
  },
});
`,paraId:2,tocIndex:2},{value:"\u5F53\u6211\u4EEC\u4EC5\u4F7F\u7528 ",paraId:3,tocIndex:4},{value:"clsx",paraId:3,tocIndex:4},{value:" \u548C ",paraId:3,tocIndex:4},{value:"twMerge",paraId:3,tocIndex:4},{value:" \u65F6\uFF0C\u5BF9\u4E8E\u590D\u6742\u7684\u7EC4\u4EF6\uFF0C\u4EE3\u7801\u4F1A\u53D8\u5F97\u96BE\u4EE5\u7EF4\u62A4\uFF1A",paraId:3,tocIndex:4},{value:`import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

// \u274C \u95EE\u9898\uFF1A\u6837\u5F0F\u903B\u8F91\u5206\u6563\uFF0C\u96BE\u4EE5\u7EF4\u62A4
const Button = ({ variant, size, state, className, children }) => {
  return (
    <button
      className={twMerge(
        clsx(
          // \u57FA\u7840\u6837\u5F0F
          'rounded font-semibold transition-colors duration-200',

          // variant \u903B\u8F91
          {
            'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary',
            'bg-gray-500 text-white hover:bg-gray-600': variant === 'secondary',
            'border-2 border-blue-500 text-blue-500': variant === 'outline',
          },

          // size \u903B\u8F91
          {
            'px-3 py-1 text-sm': size === 'small',
            'px-4 py-2 text-base': size === 'medium',
            'px-6 py-3 text-lg': size === 'large',
          },

          // state \u903B\u8F91
          {
            'opacity-50 cursor-not-allowed': state === 'disabled',
            'ring-2 ring-blue-300': state === 'focused',
          },

          // \u590D\u5408\u903B\u8F91\uFF1Aprimary + large \u7684\u7279\u6B8A\u5904\u7406
          {
            'shadow-lg': variant === 'primary' && size === 'large',
          },
        ),
        className,
      )}
    >
      {children}
    </button>
  );
};
`,paraId:4,tocIndex:4},{value:"\u6837\u5F0F\u903B\u8F91\u5206\u6563",paraId:5,tocIndex:5},{value:"\uFF1A\u4F7F\u7528 ",paraId:5,tocIndex:5},{value:"clsx",paraId:5,tocIndex:5},{value:" \u65F6\uFF0C\u6240\u6709\u6761\u4EF6\u5224\u65AD\u90FD\u6DF7\u5728\u4E00\u8D77\uFF0C\u96BE\u4EE5\u5FEB\u901F\u5B9A\u4F4D\u67D0\u4E2A\u53D8\u4F53\u7684\u6837\u5F0F",paraId:5,tocIndex:5},{value:"\u7F3A\u4E4F\u7C7B\u578B\u5B89\u5168",paraId:5,tocIndex:5},{value:"\uFF1A\u624B\u52A8\u62FC\u63A5\u5B57\u7B26\u4E32\u5BB9\u6613\u51FA\u73B0\u62FC\u5199\u9519\u8BEF\uFF0C\u4E14 TypeScript \u65E0\u6CD5\u63D0\u4F9B\u6709\u6548\u7684\u7C7B\u578B\u68C0\u67E5",paraId:5,tocIndex:5},{value:"\u590D\u5408\u53D8\u4F53\u96BE\u7BA1\u7406",paraId:5,tocIndex:5},{value:"\uFF1A\u5F53\u9700\u8981\u5904\u7406\u591A\u4E2A\u53D8\u4F53\u7684\u7EC4\u5408\u65F6\uFF08\u5982 ",paraId:5,tocIndex:5},{value:"primary + large",paraId:5,tocIndex:5},{value:"\uFF09\uFF0C\u6761\u4EF6\u5224\u65AD\u4F1A\u53D8\u5F97\u975E\u5E38\u590D\u6742",paraId:5,tocIndex:5},{value:"\u53EF\u590D\u7528\u6027\u5DEE",paraId:5,tocIndex:5},{value:"\uFF1A\u6837\u5F0F\u903B\u8F91\u4E0E\u7EC4\u4EF6\u8026\u5408\uFF0C\u96BE\u4EE5\u5728\u591A\u4E2A\u7EC4\u4EF6\u95F4\u590D\u7528",paraId:5,tocIndex:5},{value:"\u7F3A\u4E4F\u9ED8\u8BA4\u503C\u7BA1\u7406",paraId:5,tocIndex:5},{value:"\uFF1A\u9700\u8981\u624B\u52A8\u5728\u591A\u5904\u8BBE\u7F6E\u548C\u7EF4\u62A4\u9ED8\u8BA4\u503C",paraId:5,tocIndex:5},{value:"CVA \u901A\u8FC7\u58F0\u660E\u5F0F\u914D\u7F6E\u89E3\u51B3\u4E86\u8FD9\u4E9B\u95EE\u9898\uFF1A",paraId:6,tocIndex:5},{value:`import { cva } from 'class-variance-authority';

// \u2705 \u89E3\u51B3\u65B9\u6848\uFF1A\u7ED3\u6784\u5316\u7684\u6837\u5F0F\u5B9A\u4E49
const buttonStyles = cva(
  'rounded font-semibold transition-colors duration-200',
  {
    variants: {
      variant: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600',
        outline: 'border-2 border-blue-500 text-blue-500',
      },
      size: {
        small: 'px-3 py-1 text-sm',
        medium: 'px-4 py-2 text-base',
        large: 'px-6 py-3 text-lg',
      },
      state: {
        disabled: 'opacity-50 cursor-not-allowed',
        focused: 'ring-2 ring-blue-300',
        normal: '',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        size: 'large',
        class: 'shadow-lg',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      state: 'normal',
    },
  },
);
`,paraId:7,tocIndex:5},{value:"\u6E05\u6670\u7684\u7ED3\u6784",paraId:8,tocIndex:6},{value:"\uFF1A\u6BCF\u4E2A\u53D8\u4F53\u7EF4\u5EA6\u72EC\u7ACB\u5B9A\u4E49\uFF0C\u4EE3\u7801\u7EC4\u7EC7\u66F4\u6E05\u6670",paraId:8,tocIndex:6},{value:"\u7C7B\u578B\u5B89\u5168",paraId:8,tocIndex:6},{value:"\uFF1A\u81EA\u52A8\u751F\u6210 TypeScript \u7C7B\u578B\uFF0C\u907F\u514D\u62FC\u5199\u9519\u8BEF",paraId:8,tocIndex:6},{value:"\u590D\u5408\u53D8\u4F53\u652F\u6301",paraId:8,tocIndex:6},{value:"\uFF1A",paraId:8,tocIndex:6},{value:"compoundVariants",paraId:8,tocIndex:6},{value:" \u4E13\u95E8\u5904\u7406\u591A\u4E2A\u53D8\u4F53\u7684\u7EC4\u5408\u573A\u666F",paraId:8,tocIndex:6},{value:"\u9ED8\u8BA4\u503C\u7BA1\u7406",paraId:8,tocIndex:6},{value:"\uFF1A",paraId:8,tocIndex:6},{value:"defaultVariants",paraId:8,tocIndex:6},{value:" \u7EDF\u4E00\u7BA1\u7406\u9ED8\u8BA4\u503C",paraId:8,tocIndex:6},{value:"\u53EF\u590D\u7528\u6027\u5F3A",paraId:8,tocIndex:6},{value:"\uFF1A\u6837\u5F0F\u5B9A\u4E49\u53EF\u4EE5\u72EC\u7ACB\u5BFC\u51FA\uFF0C\u5728\u591A\u4E2A\u7EC4\u4EF6\u95F4\u590D\u7528",paraId:8,tocIndex:6},{value:"\u66F4\u597D\u7684 IDE \u652F\u6301",paraId:8,tocIndex:6},{value:"\uFF1A\u4EAB\u53D7\u81EA\u52A8\u8865\u5168\u548C\u7C7B\u578B\u68C0\u67E5",paraId:8,tocIndex:6},{value:`npm install class-variance-authority
# or
pnpm add class-variance-authority
# or
yarn add class-variance-authority
`,paraId:9,tocIndex:8},{value:`import { cva } from 'class-variance-authority';

const buttonStyles = cva(
  // \u57FA\u7840\u6837\u5F0F\uFF08\u59CB\u7EC8\u5E94\u7528\uFF09
  'rounded font-semibold transition-all duration-200',
  {
    variants: {
      // \u53D8\u4F53\uFF1Aintent\uFF08\u610F\u56FE\uFF09
      intent: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600',
        danger: 'bg-red-500 text-white hover:bg-red-600',
      },
      // \u53D8\u4F53\uFF1Asize\uFF08\u5C3A\u5BF8\uFF09
      size: {
        small: 'px-3 py-1 text-sm',
        medium: 'px-4 py-2 text-base',
        large: 'px-6 py-3 text-lg',
      },
    },
    // \u9ED8\u8BA4\u53D8\u4F53
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
    },
  },
);
`,paraId:10,tocIndex:10},{value:`import React from 'react';
import { VariantProps } from 'class-variance-authority';

// \u4F7F\u7528 VariantProps \u63D0\u53D6\u7C7B\u578B
type ButtonProps = VariantProps<typeof buttonStyles> & {
  children: React.ReactNode;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  intent,
  size,
  className,
  children,
}) => {
  return (
    <button
      // \u8C03\u7528 buttonStyles \u51FD\u6570\u751F\u6210\u7C7B\u540D
      className={buttonStyles({ intent, size, className })}
    >
      {children}
    </button>
  );
};

export default Button;
`,paraId:11,tocIndex:11},{value:`// \u4F7F\u7528\u9ED8\u8BA4\u6837\u5F0F\uFF08primary + medium\uFF09
<Button>\u9ED8\u8BA4\u6309\u94AE</Button>

// \u81EA\u5B9A\u4E49\u53D8\u4F53
<Button intent="danger" size="large">
  \u5371\u9669\u64CD\u4F5C
</Button>

// \u8986\u76D6\u6837\u5F0F
<Button className="rounded-full">
  \u5706\u5F62\u6309\u94AE
</Button>
`,paraId:12,tocIndex:12},{value:"\u5F53\u591A\u4E2A\u53D8\u4F53\u7EC4\u5408\u65F6\u9700\u8981\u5E94\u7528\u7279\u6B8A\u6837\u5F0F\uFF1A",paraId:13,tocIndex:14},{value:`const buttonStyles = cva('base-styles', {
  variants: {
    intent: {
      primary: 'bg-blue-500',
      secondary: 'bg-gray-500',
    },
    size: {
      small: 'text-sm',
      large: 'text-lg',
    },
    outlined: {
      true: 'border-2',
      false: '',
    },
  },
  compoundVariants: [
    {
      // \u5F53 intent \u4E3A primary \u4E14 size \u4E3A large \u65F6
      intent: 'primary',
      size: 'large',
      class: 'shadow-xl font-bold',
    },
    {
      // \u5F53 intent \u4E3A primary \u4E14 outlined \u4E3A true \u65F6
      intent: 'primary',
      outlined: true,
      class: 'border-blue-500 bg-transparent text-blue-500',
    },
  ],
  defaultVariants: {
    intent: 'primary',
    size: 'small',
    outlined: false,
  },
});
`,paraId:14,tocIndex:14},{value:"\u5904\u7406\u5F00\u5173\u5F0F\u7684\u6837\u5F0F\uFF1A",paraId:15,tocIndex:15},{value:`const alertStyles = cva('p-4 rounded', {
  variants: {
    variant: {
      info: 'bg-blue-100 text-blue-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
    },
    // \u5E03\u5C14\u53D8\u4F53
    dismissible: {
      true: 'pr-10 relative',
      false: '',
    },
    border: {
      true: 'border-2',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'error',
      border: true,
      class: 'border-red-500',
    },
  ],
  defaultVariants: {
    variant: 'info',
    dismissible: false,
    border: false,
  },
});

// \u4F7F\u7528
<Alert variant="error" dismissible border>
  \u8FD9\u662F\u4E00\u4E2A\u53EF\u5173\u95ED\u7684\u9519\u8BEF\u63D0\u793A
</Alert>;
`,paraId:16,tocIndex:15},{value:"\u67D0\u4E9B\u53D8\u4F53\u53EF\u4EE5\u4E3A\u7A7A\uFF1A",paraId:17,tocIndex:16},{value:`const badgeStyles = cva('px-2 py-1 rounded font-medium', {
  variants: {
    variant: {
      default: 'bg-gray-100 text-gray-800',
      primary: 'bg-blue-100 text-blue-800',
      success: 'bg-green-100 text-green-800',
    },
    // \u53EF\u9009\u7684 size \u53D8\u4F53
    size: {
      small: 'text-xs',
      large: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    // size \u6CA1\u6709\u9ED8\u8BA4\u503C\uFF0C\u53EF\u4EE5\u4E0D\u4F20
  },
});

// size \u53EF\u4EE5\u4E0D\u4F20
<Badge variant="primary">\u5FBD\u7AE0</Badge>

// \u4E5F\u53EF\u4EE5\u4F20\u5165
<Badge variant="success" size="large">\u5927\u5FBD\u7AE0</Badge>
`,paraId:18,tocIndex:16},{value:"CVA \u5185\u90E8\u5DF2\u7ECF\u96C6\u6210\u4E86\u51B2\u7A81\u89E3\u51B3\u673A\u5236\uFF0C\u4F46\u5982\u679C\u4F60\u60F3\u4E0E ",paraId:19,tocIndex:17},{value:"cn",paraId:19,tocIndex:17},{value:" \u5DE5\u5177\u51FD\u6570\u7ED3\u5408\uFF1A",paraId:19,tocIndex:17},{value:`import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import clsx, { ClassValue } from 'clsx';

// \u901A\u7528\u7684 cn \u5DE5\u5177\u51FD\u6570
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// \u5B9A\u4E49\u6837\u5F0F
const buttonStyles = cva('base-styles', {
  variants: {
    variant: {
      primary: 'bg-blue-500',
      secondary: 'bg-gray-500',
    },
  },
});

// \u5728\u7EC4\u4EF6\u4E2D\u4F7F\u7528
const Button = ({ variant, className, children }) => {
  return (
    <button
      className={cn(
        buttonStyles({ variant }),
        className, // \u5916\u90E8\u4F20\u5165\u7684\u7C7B\u540D\u4F1A\u6B63\u786E\u8986\u76D6\u5185\u90E8\u6837\u5F0F
      )}
    >
      {children}
    </button>
  );
};
`,paraId:20,tocIndex:17},{value:`import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

// \u5B9A\u4E49 Card \u6837\u5F0F
const cardStyles = cva(
  // \u57FA\u7840\u6837\u5F0F
  'rounded-lg overflow-hidden transition-all duration-200',
  {
    variants: {
      // \u53D8\u4F53\uFF1A\u6837\u5F0F\u4E3B\u9898
      variant: {
        default: 'bg-white border border-gray-200',
        elevated: 'bg-white shadow-md',
        outlined: 'bg-transparent border-2 border-gray-300',
      },
      // \u53D8\u4F53\uFF1A\u5185\u8FB9\u8DDD
      padding: {
        none: '',
        small: 'p-3',
        medium: 'p-4',
        large: 'p-6',
      },
      // \u53D8\u4F53\uFF1A\u662F\u5426\u53EF\u60AC\u505C
      hoverable: {
        true: 'hover:shadow-lg cursor-pointer',
        false: '',
      },
      // \u53D8\u4F53\uFF1A\u662F\u5426\u5168\u5BBD
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    compoundVariants: [
      {
        // elevated + hoverable\uFF1A\u589E\u5F3A\u60AC\u505C\u6548\u679C
        variant: 'elevated',
        hoverable: true,
        class: 'hover:shadow-xl hover:-translate-y-1',
      },
      {
        // outlined + hoverable\uFF1A\u6539\u53D8\u8FB9\u6846\u989C\u8272
        variant: 'outlined',
        hoverable: true,
        class: 'hover:border-blue-400',
      },
    ],
    defaultVariants: {
      variant: 'default',
      padding: 'medium',
      hoverable: false,
      fullWidth: false,
    },
  },
);

// \u63D0\u53D6 props \u7C7B\u578B
type CardProps = VariantProps<typeof cardStyles> & {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

// Card \u7EC4\u4EF6
const Card: React.FC<CardProps> = ({
  variant,
  padding,
  hoverable,
  fullWidth,
  className,
  children,
  onClick,
}) => {
  return (
    <div
      className={cardStyles({
        variant,
        padding,
        hoverable,
        fullWidth,
        className,
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
`,paraId:21,tocIndex:18},{value:`// \u57FA\u7840\u7528\u6CD5
<Card>
  <h3>\u6807\u9898</h3>
  <p>\u5185\u5BB9</p>
</Card>

// \u53EF\u70B9\u51FB\u7684\u5361\u7247
<Card variant="elevated" hoverable onClick={() => console.log('\u70B9\u51FB\u4E86\u5361\u7247')}>
  <h3>\u53EF\u70B9\u51FB\u7684\u5361\u7247</h3>
</Card>

// \u5168\u5BBD\u7684\u63CF\u8FB9\u5361\u7247
<Card variant="outlined" fullWidth padding="large">
  <h3>\u5168\u5BBD\u5361\u7247</h3>
</Card>

// \u81EA\u5B9A\u4E49\u6837\u5F0F\u8986\u76D6
<Card variant="elevated" className="bg-gradient-to-r from-purple-500 to-pink-500">
  <h3>\u6E10\u53D8\u80CC\u666F\u5361\u7247</h3>
</Card>
`,paraId:22,tocIndex:19},{value:"\u5BF9\u4E8E\u5927\u578B\u9879\u76EE\uFF0C\u53EF\u4EE5\u5C06\u6837\u5F0F\u5B9A\u4E49\u62BD\u79BB\u5230\u72EC\u7ACB\u6587\u4EF6\uFF1A",paraId:23,tocIndex:20},{value:`// styles/button.styles.ts
import { cva } from 'class-variance-authority';

export const buttonStyles = cva(
  'rounded font-semibold transition-colors duration-200',
  {
    variants: {
      intent: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600',
        danger: 'bg-red-500 text-white hover:bg-red-600',
      },
      size: {
        small: 'px-3 py-1 text-sm',
        medium: 'px-4 py-2 text-base',
        large: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
    },
  },
);

// components/Button.tsx
import { buttonStyles } from '@/styles/button.styles';
import { VariantProps } from 'class-variance-authority';

type ButtonProps = VariantProps<typeof buttonStyles> & {
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  intent,
  size,
  className,
  children,
}) => {
  return (
    <button className={buttonStyles({ intent, size, className })}>
      {children}
    </button>
  );
};
`,paraId:24,tocIndex:20},{value:"CVA \u7684\u672C\u8D28",paraId:25,tocIndex:22},{value:"\uFF1A",paraId:25,tocIndex:22},{value:"CVA \u662F\u5BF9 ",paraId:26,tocIndex:22},{value:"clsx",paraId:26,tocIndex:22},{value:" \u548C ",paraId:26,tocIndex:22},{value:"tailwind-merge",paraId:26,tocIndex:22},{value:" \u7684\u9AD8\u7EA7\u5C01\u88C5",paraId:26,tocIndex:22},{value:"\u63D0\u4F9B\u58F0\u660E\u5F0F\u3001\u7C7B\u578B\u5B89\u5168\u7684\u6837\u5F0F\u53D8\u4F53\u7BA1\u7406\u65B9\u6848",paraId:26,tocIndex:22},{value:"\u9002\u5408\u7BA1\u7406\u590D\u6742\u7EC4\u4EF6\u7684\u591A\u7EF4\u5EA6\u6837\u5F0F\u53D8\u5316",paraId:26,tocIndex:22},{value:"\u4F55\u65F6\u4F7F\u7528 CVA",paraId:27,tocIndex:22},{value:"\uFF1A",paraId:27,tocIndex:22},{value:"\u7EC4\u4EF6\u6709 3 \u4E2A\u4EE5\u4E0A\u7684\u6837\u5F0F\u53D8\u4F53\u7EF4\u5EA6",paraId:28,tocIndex:22},{value:"\u9700\u8981\u5904\u7406\u591A\u4E2A\u53D8\u4F53\u7684\u7EC4\u5408\u573A\u666F\uFF08\u590D\u5408\u53D8\u4F53\uFF09",paraId:28,tocIndex:22},{value:"\u9700\u8981\u7C7B\u578B\u5B89\u5168\u548C\u66F4\u597D\u7684 IDE \u652F\u6301",paraId:28,tocIndex:22},{value:"\u6837\u5F0F\u903B\u8F91\u9700\u8981\u5728\u591A\u4E2A\u7EC4\u4EF6\u95F4\u590D\u7528",paraId:28,tocIndex:22},{value:"\u4F55\u65F6\u4E0D\u9700\u8981 CVA",paraId:29,tocIndex:22},{value:"\uFF1A",paraId:29,tocIndex:22},{value:"\u7B80\u5355\u7684\u7EC4\u4EF6\uFF081-2 \u4E2A\u53D8\u4F53\u7EF4\u5EA6\uFF09",paraId:30,tocIndex:22},{value:"\u4E00\u6B21\u6027\u7684\u6837\u5F0F\u903B\u8F91",paraId:30,tocIndex:22},{value:"\u4E0D\u9700\u8981\u7C7B\u578B\u68C0\u67E5\u7684\u5C0F\u578B\u9879\u76EE",paraId:30,tocIndex:22},{value:"\u7279\u6027",paraId:31,tocIndex:23},{value:"clsx + twMerge",paraId:31,tocIndex:23},{value:"CVA",paraId:31,tocIndex:23},{value:"\u5B66\u4E60\u66F2\u7EBF",paraId:31,tocIndex:23},{value:"\u4F4E",paraId:31,tocIndex:23},{value:"\u4E2D\u7B49",paraId:31,tocIndex:23},{value:"\u4EE3\u7801\u7EC4\u7EC7",paraId:31,tocIndex:23},{value:"\u547D\u4EE4\u5F0F",paraId:31,tocIndex:23},{value:"\u58F0\u660E\u5F0F",paraId:31,tocIndex:23},{value:"\u7C7B\u578B\u5B89\u5168",paraId:31,tocIndex:23},{value:"\u5F31",paraId:31,tocIndex:23},{value:"\u5F3A\uFF08\u81EA\u52A8\u751F\u6210\u7C7B\u578B\uFF09",paraId:31,tocIndex:23},{value:"\u590D\u5408\u53D8\u4F53",paraId:31,tocIndex:23},{value:"\u624B\u52A8\u5904\u7406",paraId:31,tocIndex:23},{value:"\u539F\u751F\u652F\u6301",paraId:31,tocIndex:23},{value:"\u9ED8\u8BA4\u503C\u7BA1\u7406",paraId:31,tocIndex:23},{value:"\u624B\u52A8\u8BBE\u7F6E",paraId:31,tocIndex:23},{value:"\u7EDF\u4E00\u7BA1\u7406",paraId:31,tocIndex:23},{value:"\u9002\u7528\u573A\u666F",paraId:31,tocIndex:23},{value:"\u7B80\u5355\u5230\u4E2D\u7B49",paraId:31,tocIndex:23},{value:"\u4E2D\u7B49\u5230\u590D\u6742",paraId:31,tocIndex:23},{value:"\u5305\u5927\u5C0F",paraId:31,tocIndex:23},{value:"\u66F4\u5C0F",paraId:31,tocIndex:23},{value:"\u7A0D\u5927\uFF08~1.5kb gzipped\uFF09",paraId:31,tocIndex:23},{value:"\u6027\u80FD",paraId:31,tocIndex:23},{value:"\u5FEB",paraId:31,tocIndex:23},{value:"\u5FEB\uFF08\u5E95\u5C42\u4ECD\u4F7F\u7528 clsx + twMerge\uFF09",paraId:31,tocIndex:23},{value:`import { cva, type VariantProps } from 'class-variance-authority';

// 1. \u5B9A\u4E49\u6837\u5F0F
const styles = cva('\u57FA\u7840\u6837\u5F0F', {
  variants: {
    // \u5B9A\u4E49\u53D8\u4F53\u7EF4\u5EA6
    variant: {
      option1: '\u6837\u5F0F1',
      option2: '\u6837\u5F0F2',
    },
  },
  compoundVariants: [
    {
      // \u590D\u5408\u53D8\u4F53\uFF1A\u591A\u4E2A\u6761\u4EF6\u540C\u65F6\u6EE1\u8DB3\u65F6\u7684\u6837\u5F0F
      variant: 'option1',
      size: 'large',
      class: '\u7EC4\u5408\u6837\u5F0F',
    },
  ],
  defaultVariants: {
    // \u9ED8\u8BA4\u503C
    variant: 'option1',
  },
});

// 2. \u63D0\u53D6\u7C7B\u578B
type Props = VariantProps<typeof styles>;

// 3. \u4F7F\u7528
const className = styles({
  variant: 'option1',
  className: '\u989D\u5916\u6837\u5F0F',
});
`,paraId:32,tocIndex:24},{value:"\u6837\u5F0F\u6587\u4EF6\u7EC4\u7EC7",paraId:33,tocIndex:25},{value:"\uFF1A",paraId:33,tocIndex:25},{value:`src/
\u251C\u2500\u2500 components/
\u2502   \u2514\u2500\u2500 Button/
\u2502       \u251C\u2500\u2500 Button.tsx          # \u7EC4\u4EF6\u5B9E\u73B0
\u2502       \u2514\u2500\u2500 Button.styles.ts    # \u6837\u5F0F\u5B9A\u4E49
`,paraId:34,tocIndex:25},{value:"\u547D\u540D\u7EA6\u5B9A",paraId:35,tocIndex:25},{value:"\uFF1A",paraId:35,tocIndex:25},{value:"\u6837\u5F0F\u53D8\u4F53\u51FD\u6570\uFF1A",paraId:36,tocIndex:25},{value:"xxxStyles",paraId:36,tocIndex:25},{value:"\uFF08\u5982 ",paraId:36,tocIndex:25},{value:"buttonStyles",paraId:36,tocIndex:25},{value:"\uFF09",paraId:36,tocIndex:25},{value:"\u53D8\u4F53\u7EF4\u5EA6\uFF1A\u4F7F\u7528\u8BED\u4E49\u5316\u540D\u79F0\uFF08\u5982 ",paraId:36,tocIndex:25},{value:"intent",paraId:36,tocIndex:25},{value:"\u3001",paraId:36,tocIndex:25},{value:"size",paraId:36,tocIndex:25},{value:"\u3001",paraId:36,tocIndex:25},{value:"variant",paraId:36,tocIndex:25},{value:"\uFF09",paraId:36,tocIndex:25},{value:"\u7C7B\u578B\u5BFC\u51FA",paraId:37,tocIndex:25},{value:"\uFF1A",paraId:37,tocIndex:25},{value:`// Button.styles.ts
export const buttonStyles = cva(/* ... */);
export type ButtonStylesProps = VariantProps<typeof buttonStyles>;

// Button.tsx
import { buttonStyles, type ButtonStylesProps } from './Button.styles';
`,paraId:38,tocIndex:25},{value:"\u4E0E cn \u5DE5\u5177\u7ED3\u5408",paraId:39,tocIndex:25},{value:"\uFF1A",paraId:39,tocIndex:25},{value:`// \u63A8\u8350\u6A21\u5F0F
const className = cn(
  styles({ variant, size }), // CVA \u751F\u6210\u7684\u7C7B\u540D
  props.className, // \u5916\u90E8\u4F20\u5165\u7684\u7C7B\u540D
);
`,paraId:40,tocIndex:25},{value:"Q1: CVA \u548C\u76F4\u63A5\u7528 clsx + twMerge \u6709\u4EC0\u4E48\u533A\u522B\uFF1F",paraId:41,tocIndex:26},{value:"CVA \u63D0\u4F9B\u4E86\u66F4\u597D\u7684\u7ED3\u6784\u548C\u7C7B\u578B\u5B89\u5168\uFF0C\u9002\u5408\u590D\u6742\u7EC4\u4EF6",paraId:42,tocIndex:26},{value:"\u5BF9\u4E8E\u7B80\u5355\u573A\u666F\uFF0Cclsx + twMerge \u66F4\u8F7B\u91CF",paraId:42,tocIndex:26},{value:"Q2: CVA \u662F\u5426\u4F1A\u589E\u52A0\u5305\u4F53\u79EF\uFF1F",paraId:43,tocIndex:26},{value:"CVA gzipped \u540E\u7EA6 1.5kb\uFF0C\u5BF9\u5927\u591A\u6570\u9879\u76EE\u5F71\u54CD\u53EF\u5FFD\u7565",paraId:44,tocIndex:26},{value:"\u6362\u6765\u7684\u662F\u66F4\u597D\u7684\u5F00\u53D1\u4F53\u9A8C\u548C\u4EE3\u7801\u7EF4\u62A4\u6027",paraId:44,tocIndex:26},{value:"Q3: \u53EF\u4EE5\u5728\u975E Tailwind \u9879\u76EE\u4E2D\u4F7F\u7528 CVA \u5417\uFF1F",paraId:45,tocIndex:26},{value:"\u53EF\u4EE5\uFF0CCVA \u4E0D\u9650\u4E8E Tailwind CSS",paraId:46,tocIndex:26},{value:"\u4EFB\u4F55\u57FA\u4E8E class \u7684\u6837\u5F0F\u7CFB\u7EDF\u90FD\u53EF\u4EE5\u4F7F\u7528",paraId:46,tocIndex:26},{value:"Q4: \u5982\u4F55\u5904\u7406\u4E3B\u9898\u5207\u6362\uFF1F",paraId:47,tocIndex:26},{value:`const buttonStyles = cva('base', {
  variants: {
    theme: {
      light: 'bg-white text-black',
      dark: 'bg-black text-white',
    },
  },
});

// \u4F7F\u7528
<Button theme={currentTheme}>\u6309\u94AE</Button>;
`,paraId:48,tocIndex:26},{value:"CVA \u5B98\u65B9\u6587\u6863",paraId:49,tocIndex:27},{value:"CVA GitHub",paraId:49,tocIndex:27},{value:"Tailwind CSS",paraId:49,tocIndex:27},{value:"shadcn/ui",paraId:49,tocIndex:27},{value:" - \u5927\u91CF\u4F7F\u7528 CVA \u7684\u7EC4\u4EF6\u5E93\u793A\u4F8B",paraId:49,tocIndex:27}]}}]);
