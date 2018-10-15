package com.ssm.service.impl;

import com.ssm.dao.TblEmpMapper;
import com.ssm.entity.TblEmp;
import com.ssm.entity.TblEmpExample;
import com.ssm.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    TblEmpMapper tblEmpMapper;
    @Override
    public List<TblEmp> getAll(String condition) {
        TblEmpExample example = new TblEmpExample();
        //example.setOrderByClause("emp_name ASC");
        example.setOrderByClause(condition);

        return tblEmpMapper.selectByExampleWithDept(example);
    }

    /**
     * 员工保存
     * @param employee
     */
    @Override
    public void saveEmp(TblEmp employee) {
        tblEmpMapper.insertSelective(employee);

    }

    /**
     * 检验用户名是否可用
     * @param empName
     * @return =0为true代表姓名可用，否则false不可用
     */
    @Override
    public boolean checkUse(String empName) {
        //创建条件对象，并规定条件为empName
        TblEmpExample example = new TblEmpExample();
        TblEmpExample.Criteria criteria = example.createCriteria();
        criteria.andEmpNameEqualTo(empName);
       long count = tblEmpMapper.countByExample(example);
        return count == 0;
    }

    @Override
    public TblEmp getEmp(Integer id) {

        TblEmp employee = tblEmpMapper.selectByPrimaryKey(id);
        return employee;
    }

    /**
     * 员工更新
     * @param employee
     */
    @Override
    public void updateEmp(TblEmp employee) {
        tblEmpMapper.updateByPrimaryKeySelective(employee);
    }

    /**
     * 员工删除根据id
     *
     * @param id
     */
    @Override
    public void deleteEmp(Integer id) {
        tblEmpMapper.deleteByPrimaryKey(id);

    }

    @Override
    public void deleteBatch(List<Integer> del_ids) {
        TblEmpExample example = new TblEmpExample();
        TblEmpExample.Criteria criteria = example.createCriteria();
        //变成 delete from xxx where emp_id in ids
        criteria.andEmpIdIn(del_ids);
        tblEmpMapper.deleteByExample(example);
    }
}













