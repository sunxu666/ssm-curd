/*
 * 版    权:  Timesoft Copyright 2018-2020,All rights reserved
 * 文 件 名:  SystemService.java
 * 描       述:  <描述>
 * 修改人:  LUOXWA
 * 修改时间:  2018-8-29
 * 跟踪单号:  <跟踪单号>
 * 修改单号:  <修改单号>
 * 修改内容:  <修改内容>
 */
package com.ssm.service;

import org.springframework.stereotype.Service;

/**
 * 系统管理Service
 * @author  LUOXWA
 * @version  [版本号, 2018-8-29]
 * @see  [相关类/方法]
 * @since  [产品/模块版本]
 */
@Service("com.timesoft.system.service.SystemService")
public class SystemService {

	/**
	 * 模块URL类型_页面
	 */
	private final String MK_URLTYPE_VIEW = "1";
	/**
	 * 模块URL类型_Action
	 */
	private final String MK_URLTYPE_ACTION = "0";
	/**
	 * 系统模块ID键值
	 */
	public static final String MK_MOUDULEID_KEY = "sys_mouduleID";
	/**
	 * 系统_登录_系统私有KEY	
	 */
	public static final String SYS_LOGIN_PRIVATEKEY="systemPrivateKey";
	/**
	 * 系统_登录_系统私有KEY	
	 */
	public static final String SYS_LOGIN_PASSWORD="password";
	/**
	 * 用户密码_公开密码
	 */
	private final String USER_PASSWORD_OPEN = "open"; 
	/**
	 * 用户密码_加密密码
	 */
	private final String USER_PASSWORD_ENCRYPTION = "encryption";
	/**
	 * 系统模块服务
	 *//*
	@Autowired
	private XtmkService xtmkService;
	*//**
	 * 税务人员Service
	 *//*
	@Autowired
	private GyswryService swryService;
	*//**
	 * 系统管理员Service
	 *//*
	@Autowired
	private XtadminService adminService;
	*//**
	 * 税务机关Servide
	 *//*
	@Autowired
	private GyswjgService swjgService;
	
	*//**
	 * 创建登录公共KEY
	 * @param request
	 * @see [类、类#方法、类#成员]
	 *//*
	public Context createLoginPublicKey(HttpServletRequest request){
		HttpSession session = request.getSession();
		HashMap<String, Object> map;
		Context loginKey = ContextBase.getContext(new HashMap<String, Object>());
		try {
			map = RSAUtils.getKeys();
		    //生成公钥和私钥    
		    RSAPublicKey publicKey = (RSAPublicKey) map.get("public");    
		    RSAPrivateKey privateKey = (RSAPrivateKey) map.get("private");  
		    loginKey.addParam("privateKey", privateKey);
		    String publicKeyExponent = publicKey.getPublicExponent().toString(16);  
		    String publicKeyModulus = publicKey.getModulus().toString(16);  
		    loginKey.addParam("publicKeyExponent", publicKeyExponent);
		    loginKey.addParam("publicKeyModulus", publicKeyModulus);
		    session.setAttribute("SystemLoginKey", loginKey);
		    session.setAttribute("PASSWORD_VALIDATION_MODE", true);
		    return loginKey;
		} catch (NoSuchAlgorithmException e) {
			throw new BusinessException("00071","获取加密KEY发生错误",e);
		} 
	}
	
	*//**
	 * 验证URL是否有权限使用
	 * @param request
	 * @param url
	 * @return
	 * @see [类、类#方法、类#成员]
	 *//*
	public boolean urlRoleValidation(HttpServletRequest request,String url){
		boolean result = true;
		url = StringUtils.trim(url);
		//检查url控制器是否存在,并且是有效时,进行验证处理
		XtkzqDto kzqdDto = DictDataFactory.getDataByID(XtkzqDto.class,url);
		if (null != kzqdDto && kzqdDto.getYx_bz()) {
			//检查用户拥有使用URL的权限
			result = SessionUtils.isAccessUrl(request,url); 
		}
		return result;
	}
	
	*//**
	 * 验证是否已登录
	 * @param request
	 * @return
	 * @see [类、类#方法、类#成员]
	 *//*
	public boolean loginValidation(HttpServletRequest request){
		boolean result = true;
		User user = SessionUtils.getUser(request);
		if (null == user) result = false;
		return result;
	}
	
	*//**
	 * 获取系统模块View
	 * @param mk_dm
	 * @param request
	 * @param context
	 * @return
	 * @see [类、类#方法、类#成员]
	 *//*
	public ModelAndView getSysMouduleView(String sys_mouduleID,HttpServletRequest request,Map<String, String> params){
		ModelAndView view = null;
		XtmkDto xtmkDto = DictDataFactory.getDataByCode(XtmkDto.class, sys_mouduleID);
		if (null == xtmkDto){
			throw new BusinessException("00072", String.format("请求的模块编码不存在![模块编码=%s]", sys_mouduleID));
		}
		//用户是否有使用的该模块的权限?
		String mkurl = xtmkDto.getMkurl_mc();
		String mkurl_type = xtmkDto.getMkurl_type();
		String url = "";
		if (MK_URLTYPE_VIEW.equals(mkurl_type)){
			url = mkurl;
			//将返回的参数写到页面参数当中
			Set<String> keys = params.keySet();
			for (String k : keys){
				request.setAttribute(k, params.get(k));
			}
			request.setAttribute(MK_MOUDULEID_KEY, sys_mouduleID);
		}
		if (MK_URLTYPE_ACTION.equals(mkurl_type)){
			url = "redirect:" + mkurl;
		}
		view = new ModelAndView(url,params);
		return view;
	}
	
	*//**
	 * 获取用户信息
	 * @param username
	 * @return
	 * @see [类、类#方法、类#成员]
	 *//*
	public User getUserInfo(String username,HttpServletRequest request){
		boolean isSuper = adminService.validationSuperAdmin(username);
		User user = new User();
		String sessionId = request.getSession().getId();
		user.setSessionId(sessionId);
		//如果是超级用户
		if (isSuper){
			user = new User();
			user.setCode(username);
			user.setLx_bj(User.USER_LX_SUPER);
			//获取超级管理员所属机关,从管理员表中获取
			XtadminInfo adminInfo = new XtadminInfo();
			adminInfo.setAdmin_dm(username);
			List<XtadminDto> adminDtos = adminService.queryByList(adminInfo);
			XtadminDto adminDto = adminDtos.get(0);
			user.setName(adminDto.getAdmin_mc());
			user.setId(adminDto.getId());
			user.setSsswjg_dm(adminDto.getSsswjg_dm());
			user.setSsswjg_id(adminDto.getSsswjg_id());
			user.setSwry_mm(adminDto.getSwry_mm());
			GyswjgDto swjgDto = swjgService.queryByCode(adminDto.getSsswjg_dm());
			adminDto.setSwjgDto(swjgDto);
			user.setSwryDto(adminDto);
		}else{
			user = new User();
			user.setCode(username);
			user.setLx_bj(User.USER_LX_USER);
			GyswryInfo swryinfo = new GyswryInfo();
			swryinfo.setCode(username);
			List<GyswryDto> swrydtos =swryService.queryByList(swryinfo);
			if (SystemCommonF.isEmpty(swrydtos)) throw new BusinessException("00086","未检索到用户信息");
			GyswryDto swrydto = swrydtos.get(0);
			user.setId(swrydto.getId());
			user.setName(swrydto.getName());
			user.setSsswjg_id(swrydto.getSsswjg_id());
			user.setSsswjg_dm(swrydto.getSsswjg_dm());
			GyswjgDto swjgDto = swjgService.queryByCode(swrydto.getSsswjg_dm());
			swrydto.setSwjgDto(swjgDto);
			user.setSwryDto(swrydto);
		}
		return user;
	}
	
	*//**
	 * 获取权限列表
	 * 
	 * @param dto
	 * @return
	 *//*
	public void getAccessUrl(User user) {
		List<String> urlList = new ArrayList<String>();
		List<XtmkDto> xtmkDtos = new ArrayList<XtmkDto>();
		//如果是超级管理员时取所有菜单信息
		if (SessionUtils.isAdmin(user)){
			xtmkDtos = xtmkService.queryByListToSqlId("queryMkBySuper", null);
		}else{
			xtmkDtos = xtmkService.queryMkBySwryid(user.getId());
		}
		for (XtmkDto xtmkDto : xtmkDtos) {
			String url = xtmkDto.getMkurl_mc();
			if (!(url == null || url.equals(""))) {
				urlList.add(url.trim());

			} else {
				url = xtmkDto.getCode();
				if (!(url == null || url.equals(""))) {
					urlList.add(url.trim());
				}
			}
			List<XtkzqDto> xtkzqDtos = xtmkDto.getKzqDtos();
			for (XtkzqDto kzqDto : xtkzqDtos) {
				url = kzqDto.getUrl();
				if (!(url == null || url.equals(""))) {
					urlList.add(url.trim());
				}
			}
		}
		user.setMkList(xtmkDtos);
		user.setRoleList(urlList);
	}
	
	*//**
	 * 解密登录密码
	 * @param password
	 * @param request
	 * @return
	 * @see [类、类#方法、类#成员]
	 *//*
	public Context decipheringPassword(String password,HttpServletRequest request){
		Context result = ContextBase.getContext(new HashMap<String, Object>());
		String encryptionMode = SystemCommonF.getApplicationParam("system.PasswordEncryptionMode").toLowerCase();
		String systemPrivateKey =""; 
		try{
			//加密密码模式时,解密密码信息
			if (encryptionMode.equals(USER_PASSWORD_ENCRYPTION)){
				Boolean pwd_val = (Boolean)request.getSession().getAttribute("PASSWORD_VALIDATION_MODE");
				//判断前台的私钥是否拿到,如果没有进行rsa加密则不进行解密
				if (pwd_val!=null){
				if(pwd_val){
					Context ctx = (Context)request.getSession().getAttribute("SystemLoginKey");
					RSAPrivateKey privateKey = (RSAPrivateKey)ctx.getParam("privateKey");
					//获取私KEY信息
					systemPrivateKey = privateKey.getPrivateExponent().toString(16);
					password = RSAUtils.decryptByPrivateKey(password, privateKey); //解密后的密
				  }
				}
			}
			//明码模式时
			if (encryptionMode.equals(USER_PASSWORD_OPEN)){
				
			}
			result.addParam(SYS_LOGIN_PRIVATEKEY, systemPrivateKey);
			result.addParam(SYS_LOGIN_PASSWORD, password);
			return result;
		}catch (Exception e){
			throw new BusinessException("00085","解密登录密码信息发生错误!",e); 
		}
	}*/
}
