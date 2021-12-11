import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Quá Ngắn!')
        .max(30, 'Quá Dài!')
        .required('Bắt Buộc Nhập!'),
    password: Yup.string()
        .min(6, 'Tối Thiểu 6 Ký Tự!')
        .max(30, 'Tối Đa 30 Ký Tự!')
        .required('Bắt Buộc Nhập!'),
    passwordAuth: Yup.string()
        .required('Bắt Buộc Nhập!')
        .oneOf([Yup.ref('password')],'Xác Nhận Mật Khẩu Không Đúng!'),

});
