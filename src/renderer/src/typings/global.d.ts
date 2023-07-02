export {}
declare global {
  interface routeType {
    id: string //ID
    name: string //路由名称
    hidden: boolean //显示状态
    redirect: string //重写向地址
    component: string //组件路径
    alwaysShow: boolean //是否总显示
    query: string //路由参数
    path: string //路由地址
    meta: {
      title: string //标题
      icon: string //图标
      noCache: boolean //是否缓存
      link: string //外链
    }
    children?: routeType[]
  }

  interface IUser {
    id: string
    username: string //用户名
    realName: string //真实姓名
    userType: 0 | 1 //用户类型（0：普通账号；1：超级管理员）
    email: string //用户邮箱
    phone: string //手机号码
    gender: 0 | 1 | 2 //用户性别（1：男；2：女；0：未知）
    avatar: string //头像路径
    enabled: 0 | 1 //帐号状态（0：禁用；1：正常）
    delFlag: 0 | 1 //是否删除（0：有效；1：删除）
    loginIp: string //最后登陆IP
    loginDate: number //最后登陆时间
    createBy: null
    createTime: number
    updateBy: string
    updateTime: number
    remark: string //备注
  }

  interface PageParam {
    current: number
    size: number
    enabled?: string //状态（1：启用；0：禁用）
  }

  interface CommonPageApi {
    getPage: (pageParam: any) => Promise<any>
    getDetailById: (id: string) => Promise<any>
    addItem: (Item: any) => Promise<any>
    updateItem: (Item: any) => Promise<any>
    deleteItem: (id: string) => Promise<any>
  }
}

export enum DictType {
  PROCESS_REFUND_TYPE = 'process_refund_type',
  INTERVIEW_RESULT = 'interview_result',
  INSTALLMENT_COUNT = 'installment_count',

  // 招生字典
  RECRUIT_CHARGE_TYPE = 'recruit_charge_type',
  RECRUIT_REFUND_STATUS = 'recruit_refund_status',
  RECRUIT_TYPE = 'recruit_type',
  RECRUIT_COUPON_TYPE = 'recruit_coupon_type',
  RECRUIT_AUDITIONS_STATUS = 'recruit_auditions_status',
  RECRUIT_FOLLOW_METHOD = 'recruit_follow_method',
  RECRUIT_CUSTOMER_LEVEL = 'recruit_customer_level',
  RECRUIT_DEALSTATUS = 'recruit_dealStatus',
  RECRUIT_INTENTION = 'recruit_intention',
  RECRUIT_CONSULT_SITUATION = 'recruit_consult_situation',
  RECRUIT_EDUCATION_BACKGROUND = 'recruit_education_background',

  // 教学字典
  CRM_AUDIT_STATUS = 'crm_audit_status',
  CRM_CLASS_TYPE = 'crm_class_type',
  CRM_CLASS_STATUS = 'crm_class_status',
  CRM_CLASS_COURSE = 'crm_class_course',
  CRM_TEACHING_METHOD = 'crm_teaching_method',

  // 系统字典
  SYSTEM_MENU_PARENTVIEW = 'system_menu_parentview',
  SYSTEM_TASK_STATUS = 'system_task_status',
  SYSTEM_GLOBAL_EXPSTATUS = 'system_global_expstatus',
  SYSTEM_GLOBAL_TASKGROUP = 'system_global_taskgroup',
  SYSTEM_GLOBAL_VISIBILITY = 'system_global_visibility',
  SYSTEM_ALLOW_PROHIBIT = 'system_allow_prohibit',
  SYSTEM_MISFIRE_POLICY = 'system_misfire_policy',
  SYSTEM_OPERATOR_TYPE = 'system_operator_type',
  SYSTEM_NOTICE_TYPE = 'system_notice_type',
  SYSTEM_GLOBAL_YESORNO = 'system_global_yesorno',
  SYSTEM_GLOBAL_CACHE = 'system_global_cache',
  SYSTEM_MENU_TYPE = 'system_menu_type',
  SYSTEM_GLOBAL_STATUS = 'system_global_status',
  SYSTEM_GLOBAL_GENDER = 'system_global_gender'
}
