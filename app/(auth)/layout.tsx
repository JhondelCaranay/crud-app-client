type Props = {
  children: React.ReactNode;
};
const AuthLayout = ({ children }: Props) => {
  return (
    <div className="h-screen w-full flex justify-center items-center   bg-gradient-to-tr from-blue-500 to-purple-500">
      {children}
    </div>
  );
};
export default AuthLayout;
