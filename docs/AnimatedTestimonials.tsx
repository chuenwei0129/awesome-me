import React, { useEffect, useState } from 'react';

import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';

// 推荐数据的数据结构定义
type Testimonial = {
  quote: string; // 推荐内容/引用
  name: string; // 推荐人姓名
  designation: string; // 推荐人职位/身份
  src: string; // 推荐人头像图片地址
};

/**
 * 动画推荐组件
 * 展示带有动画效果的推荐轮播，支持自动播放和手动切换
 */
const AnimatedTestimonials = ({
  testimonials, // 推荐数据数组
  autoplay = false, // 是否自动播放，默认关闭
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  // 当前激活的推荐索引
  const [active, setActive] = useState(0);

  /**
   * 切换到下一个推荐
   * 使用取模运算实现循环切换
   */
  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  /**
   * 切换到上一个推荐
   * 使用取模运算实现循环切换，处理负数情况
   */
  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  /**
   * 判断指定索引是否为当前激活状态
   */
  const isActive = (index: number) => {
    return index === active;
  };

  // 自动播放功能
  useEffect(() => {
    if (autoplay) {
      // 每5秒自动切换到下一个推荐
      const interval = setInterval(handleNext, 5000);
      // 组件卸载时清理定时器
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  /**
   * 生成随机的Y轴旋转角度
   * 用于创建更自然的动画效果
   */
  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10; // 返回 -10 到 10 之间的随机数
  };

  return (
    <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20">
      {/* 主容器：左侧图片，右侧内容 */}
      <div className="relative grid grid-cols-1 md:grid-cols-2  gap-20">
        {/* 左侧：图片展示区域 */}
        <div>
          <div className="relative h-80 w-full">
            {/* 使用 AnimatePresence 管理动画的进入和退出 */}
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  // 初始状态：透明度0，缩放0.9，Z轴-100，随机旋转
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  // 动画状态：根据是否激活设置不同的样式
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7, // 激活项完全不透明，其他项半透明
                    scale: isActive(index) ? 1 : 0.95, // 激活项正常大小，其他项稍小
                    z: isActive(index) ? 0 : -100, // 激活项在最前面
                    rotate: isActive(index) ? 0 : randomRotateY(), // 激活项不旋转，其他项随机旋转
                    zIndex: isActive(index)
                      ? 9
                      : testimonials.length + 2 - index, // 设置层级，激活项最高
                    y: isActive(index) ? [0, -80, 0] : 0, // 激活项有上下浮动动画
                  }}
                  // 退出状态：透明度0，缩放0.9，Z轴100，随机旋转
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  // 动画配置：持续时间0.4秒，缓动函数
                  transition={{
                    duration: 0.4,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  {/* 推荐人头像图片 */}
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false} // 禁止拖拽
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* 右侧：推荐内容区域 */}
        <div className="flex justify-between flex-col py-4">
          {/* 推荐内容：姓名、职位、引用文字 */}
          <motion.div
            key={active} // 当active改变时重新渲染
            // 内容切换动画：从下方进入
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: 'easeInOut',
            }}
          >
            {/* 推荐人姓名 */}
            <h3 className="text-2xl font-bold dark:text-white text-black">
              {testimonials[active].name}
            </h3>
            {/* 推荐人职位 */}
            <p className="text-sm text-gray-500 dark:text-neutral-500">
              {testimonials[active].designation}
            </p>
            {/* 推荐内容：逐字动画效果 */}
            <motion.p className="text-lg text-gray-500 mt-8 dark:text-neutral-300">
              {testimonials[active].quote.split(' ').map((word, index) => (
                <motion.span
                  key={index}
                  // 每个单词的初始状态：模糊、透明、向下偏移
                  initial={{
                    filter: 'blur(10px)',
                    opacity: 0,
                    y: 5,
                  }}
                  // 每个单词的动画状态：清晰、不透明、正常位置
                  animate={{
                    filter: 'blur(0px)',
                    opacity: 1,
                    y: 0,
                  }}
                  // 动画配置：根据单词索引设置延迟，创造打字机效果
                  transition={{
                    duration: 0.2,
                    ease: 'easeInOut',
                    delay: 0.02 * index, // 每个单词延迟0.02秒
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          {/* 控制按钮区域 */}
          <div className="flex gap-4 pt-12 md:pt-0">
            {/* 上一个按钮 */}
            <button
              type="button"
              onClick={handlePrev}
              className="cursor-pointer h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
            >
              {/* 左箭头图标，悬停时旋转12度 */}
              <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            {/* 下一个按钮 */}
            <button
              type="button"
              onClick={handleNext}
              className="cursor-pointer h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
            >
              {/* 右箭头图标，悬停时反向旋转12度 */}
              <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedTestimonials;
