/**
 * inline: true
 */

import React from 'react';
import { Timeline } from './Timeline';

export default function TimelineDemo() {
  const data = [
    {
      title: '第一步：备料',
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            开始当然是备料啦！把大葱洗干净，倾斜着切成片。然后线椒和小米椒也一样切片，待用。这些都是小细节，尤其是葱的切法，会影响最后的口感哦。
          </p>
          <img
            src="https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241113142524.png"
            alt="备料"
            width={900}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
        </div>
      ),
    },
    {
      title: '第二步：调制酱料',
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            酱料可是关键，把盐、糖、酱油、白胡椒粉和醋混在一个小碗里，搅拌均匀。每一种调料的比例都得拿捏好，这样才能保证味道正宗。
          </p>
          <img
            src="https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241113142729.png"
            alt="调制酱料"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
        </div>
      ),
    },
    {
      title: '处理肥牛',
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            接下来，把锅里的水烧开，把肥牛放进去焯一下，看到变色了就立刻捞出来。这个过程要快，才能保证肉质鲜嫩多汁。{' '}
          </p>
          <img
            src="https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241113142804.png"
            alt="处理肥牛"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
        </div>
      ),
    },
    {
      title: '第四步：炒制',
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            这步是炒菜的大戏！锅里倒油烧热，先放姜片和豆瓣酱炒出红油，再加入大葱炒出香味，接着把线椒和小米椒也放进去翻炒一下。最后，把之前调好的酱料和焯过水的肥牛倒进去，大火快速翻炒几下，就可以出锅啦。
          </p>
          <img
            src="https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241113142853.png"
            alt="炒制"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
        </div>
      ),
    },
  ];
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
