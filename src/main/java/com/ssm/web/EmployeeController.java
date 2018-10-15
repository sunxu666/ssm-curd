package com.ssm.web;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.ssm.entity.Msg;
import com.ssm.entity.TblEmp;
import com.ssm.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 处理员工CRUD请求
 * @author
 */
@Controller
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;
    /**
     * 单个批量二合一
     * 批量：1-2-3
     * 单个删除：1
     * @param ids
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/emp/{ids}", method = RequestMethod.DELETE)
    public Msg deleteEmp(@PathVariable("ids") String ids){
        if (ids.contains("-")){
            List<Integer> del_ids = new ArrayList<Integer>();
            String[] str_ids = ids.split("-");
            //组装id的集合
            for (String str : str_ids){
                del_ids.add(Integer.parseInt(str));
            }
            employeeService.deleteBatch(del_ids);
        }else {
            Integer id = Integer.parseInt(ids);
            employeeService.deleteEmp(id);
        }
        return Msg.success();
    }

  /*  @ResponseBody
    @RequestMapping(value = "/emp/{id}",method = RequestMethod.DELETE)
    public Msg deleteEmpById(@PathVariable("id")Integer id){
        employeeService.deleteEmp(id);
        return Msg.success();
    }*/

    /**
     * 请求体中有数据，Employee拼装不上，
     * Tomcat ：请求体中的数据，封装成map
     *        SpringMVC封装POJO对象的时候，
     *        会把每个属性的值调用request.getParamter("");
     *
     * Ajax发送PUT请求会引发异常：
     *          Tomcat看到PUT不会封装请求体中的数据为map
     * 若要能直接支持PUT之类的请求，需要重新封装请求体中的数据
     * 配置HttpPutFormContentFilter,
     * 将请求体中的数据解析包装成一个map
     * request被重新包装,getParameter()被重写,
     * 就会重自己封装的map中取数据
     *
     * 员 工 更 新
     * @param employee
     * @return
     */
    @ResponseBody
    @RequestMapping (value = "/emp/{empId}",method = RequestMethod.PUT)
    public Msg saveEmp(TblEmp employee){
        System.out.println("将要更新的数据"+employee.toString());
        employeeService.updateEmp(employee);
        return Msg.success();
    }

    @RequestMapping(value = "/emp/{id}",method = RequestMethod.GET)
    @ResponseBody
    public Msg getEmp(@PathVariable("id") Integer id){

        TblEmp employee = employeeService.getEmp(id);
        return Msg.success().add("emp",employee);
    }

    /**
     * 检查用户是否可用
     * @param empName
     * @return
     */
    @RequestMapping(value ="/checkuse" )
    @ResponseBody
    public Msg checkuse(@RequestParam(value = "empName") String empName){
        String regx = "(^[a-zA-Z0-9_-]{6,16}$)|([\\u2E80-\\u9FFF]{2,5})";
      if (!empName.matches(regx)){
          return Msg.fail().add("va_msg","用户名必须为6-16位英文和数字的组合或者2-5位中文");
      }
      //数据库用户名重复校验
        boolean b = employeeService.checkUse(empName);
      if(b){
          return Msg.success();
      }else{
          return Msg.fail().add("va_msg","用户名不可用！");
      }

    }

    /**
     * 员工保存,进行注解校验
     * @param employee
     * @return
     */
    @RequestMapping(value = "/emp",method = RequestMethod.POST)
    @ResponseBody
    public Msg saveEmp(@Valid TblEmp employee,BindingResult result){
        if(result.hasErrors()){
            //校验失败，返回时报，显示错误信息
            Map<String ,Object> map = new HashMap<>();
            List<FieldError> errors = result.getFieldErrors();
            for (FieldError fieldError:errors) {
                System.out.println("错误字段名;"+fieldError.getField());
                System.out.println("错误信息;"+fieldError.getDefaultMessage());
                map.put(fieldError.getField(),fieldError.getDefaultMessage());
            }
            return Msg.fail().add("errorFields",map);
        }else{
            employeeService.saveEmp(employee);
            return Msg.success();
        }

    }

    /**
     * 查询分页获取信息
     * @param request
     * @return
     */
   /* @RequestMapping(value = "/emps")
    @ResponseBody
    //public Msg getEmpsWithJson(@RequestParam(value = "pn",defaultValue = "1") Integer pn ,@RequestParam(value = "pageSize",defaultValue = "10")Integer pageSize){
    public Msg getEmpsWithJson(HttpServletRequest request){
        String spageSize = request.getParameter("pageSize");
        int pageSize = 0;
        if(spageSize!=null&&spageSize.length()!=0){
            pageSize =  Integer.parseInt(spageSize);
        }

       String spageNumber =  request.getParameter("pageNumber");
        int pageNumber = 0;
        if(spageSize!=null&&spageSize.length()!=0){
            pageNumber = Integer.parseInt(spageNumber);
        }
        //这不是一个分页查询
        //引入PageHelper分页插件,在查询之前只需要调用，传入页码,以及每页的大小
        PageHelper.startPage(pageNumber,pageSize);
        //startPage后面紧跟的查询就是分页查询
        List<TblEmp> emps = employeeService.getAll();
        //使用pageInfo包装查询后的结果,只需将pageInfo交给页面就行了
        //封装了详细的分页信息，包括我们查询出来的数据,传入连续显示的页数
        PageInfo page = new PageInfo(emps,5);
        return Msg.success().add("pageInfo",page);
    }*/

    /**
     * 查询员工数据（分页查询）
     * @return
     */
    //@RequestMapping(value = "/emps")
   /* public String getEmps(@RequestParam(value = "pn",defaultValue = "1") Integer pn,Model model){
        //这不是一个分页查询
        //引入PageHelper分页插件,在查询之前只需要调用，传入页码,以及每页的大小
        PageHelper.startPage(pn,5);
        //startPage后面紧跟的查询就是分页查询
        List<TblEmp> emps = employeeService.getAll();
        //使用pageInfo包装查询后的结果,只需将pageInfo交给页面就行了
        //封装了详细的分页信息，包括我们查询出来的数据,传入连续显示的页数
        PageInfo page = new PageInfo(emps,5);
        model.addAttribute("pageInfo",page);
        return "list";
    }*/


    /**
     * 查询分页获取信息
     * @param request
     * @return
     */
    @RequestMapping(value = "/emps")
    @ResponseBody
    public Msg getEmpsWithJson(HttpServletRequest request,Model model){
        String spageSize = request.getParameter("pageSize");
        int pageSize = 0;
        if(spageSize!=null&&spageSize.length()!=0){
            pageSize =  Integer.parseInt(spageSize);
        }else{
            pageSize=10;
        }

        String spageNumber =  request.getParameter("pageNumber");
        System.out.println("pageSize:====="+spageSize);
        int pageNumber = 0;
        if(spageSize!=null&&spageSize.length()!=0){
            pageNumber = Integer.parseInt(spageNumber);
        }else{
            pageNumber=1;
        }
        String condition = request.getParameter("order");
        if(condition.equals("null asc")){
            condition=null;

        } else if(condition.equals("empName asc")){
            condition="emp_name asc";
        }else if(condition.equals("empName desc")){
            condition="emp_name desc";
        }
        System.out.println("条件：===="+condition);
        //这不是一个分页查询
        //引入PageHelper分页插件,在查询之前只需要调用，传入页码,以及每页的大小
        PageHelper.startPage(pageNumber,pageSize);
        //startPage后面紧跟的查询就是分页查询
        List<TblEmp> emps = employeeService.getAll(condition);
        //使用pageInfo包装查询后的结果,只需将pageInfo交给页面就行了
        //封装了详细的分页信息，包括我们查询出来的数据,传入连续显示的页数
        PageInfo page = new PageInfo(emps,5);
        return Msg.success().add("pageInfo",page);
    }

}













