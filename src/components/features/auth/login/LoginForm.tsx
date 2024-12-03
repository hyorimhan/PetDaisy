import { useForm } from 'react-hook-form';

function LoginForm() {
  const { register, handleSubmit } = useForm();
  return (
    <div>
      <form>
        <label htmlFor="nickname">닉네임</label>
        <input type="text" />
      </form>
    </div>
  );
}

export default LoginForm;
