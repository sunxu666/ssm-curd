package com.ssm.web;

import com.ssm.service.SystemService;
import com.ssm.util.URLUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * 居民收入管理
 * @author
 */
@Controller
@RequestMapping("/jmsrgl")
public class JmsrglController {
    /**
     * 去登陆页面
     * @return
     */
    @RequestMapping(value = "/toLogin",method = RequestMethod.GET)
    public String toLogin(){
        return "/jmsrgl/login";
    }

    /**
     * 登陆页面的操作
     * @return
     */
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public String login(){
        return "/jmsrgl/login";
    }

    /**
     * 去首页
     * @return
     */
    @RequestMapping(value = "/toIndex")
    public String toIndex(){
        return "/jmsrgl/index";
    }
    /**
     * 所有ActionMap 统一从这里获取
     *
     * @return
     */
    public Map<String, Object> getRootMap() {
        Map<String, Object> rootMap = new HashMap<String, Object>();
        // 添加url到 Map中
        rootMap.putAll(URLUtils.getUrlMap());
        return rootMap;
    }

    /**
     *
     * @param request
     * @return
     */
    public Map<String, String> getParaMap(HttpServletRequest request) {
        Map<String, String[]> params = request.getParameterMap();
        Map<String, String> newParams = new HashMap<String, String>();
        Set<String> keys = params.keySet();// 列出所有表单参数
        for (String key : keys) {
            String[] values = params.get(key);// 尝试获取多个参数
            String valueString = "";
            for (String value : values) {
                valueString = valueString + value;
            }
            newParams.put(key, valueString);
        }
        return newParams;
    }
    /**
     * 执行公共功能模块
     * @param sys_mouduleID
     * @param request
     * @param response
     * @return
     * @see [类、类#方法、类#成员]
     */
    //@Auth(verifyLogin = true, verifyURL = true)
    @RequestMapping("/doPublicMoudule")
    public ModelAndView doPublicMoudule(String sys_mouduleID, HttpServletRequest request, HttpServletResponse response){
        Map<String, Object> context = getRootMap();
        Map<String, String> params = getParaMap(request);
        context.put(SystemService.MK_MOUDULEID_KEY, sys_mouduleID);
       // ModelAndView view = systemService.getSysMouduleView(sys_mouduleID, request, params);
       // return view;
        return null;
    }
}
