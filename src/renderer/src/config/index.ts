const CONFIG = {
  AES_KEY: 'bGvnMc62sh5RV6zP',
  AES_OFF: '1eZ43DLcYtV2xb3Y',
  CODE_MSG: {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    405: '请求方法不被允许。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。'
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

export default CONFIG
