// import React, { useEffect, useRef } from 'react';

// // Example template data
// // const templates = [
// //   { id: 1, name: 'Frame 1', style: { borderColor: 'red', borderWidth: 5 } },
// //   { id: 2, name: 'Frame 2', style: { borderColor: 'blue', borderWidth: 10 } },
// //   { id: 3, name: 'Frame 3', style: { borderColor: 'green', borderWidth: 15 } },
// //   { id: 4, name: 'Frame 4', style: { borderColor: 'red', borderWidth: 5 } },
// //   { id: 5, name: 'Frame 5', style: { borderColor: 'blue', borderWidth: 10 } },
// //   { id: 6, name: 'Frame 6', style: { borderColor: 'green', borderWidth: 15 } },
// // ];

// function generateTemplates(count: number): {
//   id: number;
//   name: string;
//   style: { borderColor: string; borderWidth: number };
// }[] {
//   const borderColors = ['red', 'blue', 'green', 'purple', 'yellow', 'orange'];
//   const borderWidths = [5, 10, 15, 20];

//   const templates = Array.from({ length: count }, (_, i) => {
//     const borderColor = borderColors[i % borderColors.length];
//     const borderWidth = borderWidths[i % borderWidths.length];
//     return {
//       id: i + 1,
//       name: `Frame ${i + 1}`,
//       style: {
//         borderColor,
//         borderWidth,
//       },
//     };
//   });

//   return templates;
// }

// // 使用示例
// const templates = generateTemplates(15000);

// interface ImageDecorationTemplatesProps {
//   originalImage: string;
//   onSelectTemplate: (templateId: number) => void;
// }

// const ImageDecorationTemplates: React.FC<ImageDecorationTemplatesProps> = ({
//   originalImage,
//   onSelectTemplate,
// }) => {
//   const canvasRefs = useRef<any[]>([]);

//   const applyTemplate = (canvas: HTMLCanvasElement, templateStyle: any) => {
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     // Load the original image
//     const img = new Image();
//     img.src = originalImage;
//     img.onload = () => {
//       // Render the original image
//       canvas.width = img.width;
//       canvas.height = img.height;
//       ctx.drawImage(img, 0, 0);

//       // Apply frame (example of decoration)
//       ctx.strokeStyle = templateStyle.borderColor;
//       ctx.lineWidth = templateStyle.borderWidth;
//       ctx.strokeRect(0, 0, img.width, img.height);
//     };
//   };

//   useEffect(() => {
//     templates.forEach((template, index) => {
//       const canvas = canvasRefs.current[index];
//       if (canvas) {
//         applyTemplate(canvas, template.style);
//       }
//     });
//   }, [originalImage]);

//   return (
//     <div className="grid grid-cols-3 gap-4">
//       {templates.map((template, index) => (
//         <div
//           key={template.id}
//           className="cursor-pointer"
//           onClick={() => onSelectTemplate(template.id)}
//         >
//           <canvas
//             ref={(el) => (canvasRefs.current[index] = el)}
//             className="w-full h-auto"
//           ></canvas>
//           <p className="text-center my-2">{template.name}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ImageDecorationTemplates;

import React, { useEffect, useState } from 'react';

// Example template data generation
const generateTemplates = (count: number) => {
  const borderColors = ['red', 'blue', 'green', 'purple', 'yellow', 'orange'];
  const borderWidths = [5, 10, 15, 20];

  return Array.from({ length: count }, (_, i) => {
    const borderColor = borderColors[i % borderColors.length];
    const borderWidth = borderWidths[i % borderWidths.length];
    return {
      id: i + 1,
      name: `Frame ${i + 1}`,
      style: { borderColor, borderWidth },
    };
  });
};

const templates = generateTemplates(10000);

interface ImageDecorationTemplatesProps {
  originalImage: string;
  onSelectTemplate: (templateId: number) => void;
}

const ImageDecorationTemplates: React.FC<ImageDecorationTemplatesProps> = ({
  originalImage,
  onSelectTemplate,
}) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const applyTemplateAndDestroyCanvas = (
    templateStyle: any,
  ): Promise<string> => {
    return new Promise((resolve) => {
      // Create a temporary canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;

      // Load the original image
      const img = new Image();
      img.src = originalImage;
      img.onload = () => {
        // Set canvas dimensions
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image and apply the template style (e.g., border)
        ctx.drawImage(img, 0, 0);
        ctx.strokeStyle = templateStyle.borderColor;
        ctx.lineWidth = templateStyle.borderWidth;
        ctx.strokeRect(0, 0, img.width, img.height);

        // Convert canvas to base64 URL
        const dataUrl = canvas.toDataURL();

        // Clean-up
        canvas.remove(); // Remove canvas by destroying its instance
        resolve(dataUrl);
      };
    });
  };

  // Generate image URLs for templates
  useEffect(() => {
    const generateImageUrls = async () => {
      const urls = await Promise.all(
        templates.map((template) =>
          applyTemplateAndDestroyCanvas(template.style),
        ),
      );
      setImageUrls(urls);
    };

    generateImageUrls();
  }, [originalImage]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {imageUrls.map((url, index) => (
        <div
          key={templates[index].id}
          className="cursor-pointer"
          onClick={() => onSelectTemplate(templates[index].id)}
        >
          <img
            src={url}
            alt={templates[index].name}
            className="w-full h-auto"
          />
          <p className="text-center my-2">{templates[index].name}</p>
        </div>
      ))}
    </div>
  );
};

export default ImageDecorationTemplates;
