import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { loginInput, useLogin } from "../../hooks/useLogin";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router";
import { decodeToken } from "../../util/decode-token";
import ManagerIcon from "../../components/ManagerIcon";

interface LoginProps {}

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login: React.FC<LoginProps> = () => {
  const [form] = useForm();
  const login = useLogin();
  const navigate = useNavigate();
  const [accessCookie, setAccessCookie] = useCookies(["access"]);
  const [refreshCookie, setRefreshCookie] = useCookies(["refresh"]);

  const onFinish = (values: loginInput) => {

    const tokens = login.mutate(values, {
      onSuccess: (data: any) => {
        console.log("successful login", data);
        const exp = new Date();
        exp.setDate(exp.getDate() + 1);
        setAccessCookie("access", data?.accessToken, { expires: exp });
        setRefreshCookie("refresh", data?.refreshToken, { expires: exp });
        navigate("/dashboard");
      },
      onError: (data: any) => {
        console.log(data);
        navigate("/login");
      },
    });
  };

  const current = new Date(Date.now());
  let isAuthenticated = false;
  try {
    let token = decodeToken(accessCookie?.access);
    if (token && token.Expiration > current) {
      isAuthenticated = true;
    }
  } catch (error) {}

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <>
      <div className="login-main-container">
        <div className="login-svg-container">
          <ManagerIcon />
        </div>
        <div className="login-form-container">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ width: "80%" }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <h1>Welcome!</h1>
            <h2>Username</h2>
            <Form.Item<FieldType>
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <h2>Password</h2>
            <Form.Item<FieldType>
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button ghost size="large" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
