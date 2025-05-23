/**
 * defaultShowCode: true
 */

const MyInput = (props) => {
  const className = `border rounded px-[20px] py-[20px] ${props.className || ''}`;

  return <input {...props} className={className}></input>;
};

export default function page() {
  return <MyInput className="p-[5px]" />;
}
