package com.ssm.dao;

import com.ssm.entity.TblEmp;
import com.ssm.entity.TblEmpExample;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TblEmpMapper {
    long countByExample(TblEmpExample example);

    int deleteByExample(TblEmpExample example);

    int deleteByPrimaryKey(Integer empId);

    int insert(TblEmp record);

    int insertSelective(TblEmp record);

    List<TblEmp> selectByExample(TblEmpExample example);

    TblEmp selectByPrimaryKey(Integer empId);

    /**
     * 根据条件查询所有成员和部门
     * @param example
     * @return
     */
    List<TblEmp> selectByExampleWithDept(TblEmpExample example);
    /**
     * 根据empId查询所有成员和部门
     * @param empId
     * @return
     */
    TblEmp selectByPrimaryKeyWithDept(Integer empId);

    int updateByExampleSelective(@Param("record") TblEmp record, @Param("example") TblEmpExample example);

    int updateByExample(@Param("record") TblEmp record, @Param("example") TblEmpExample example);

    int updateByPrimaryKeySelective(TblEmp record);

    int updateByPrimaryKey(TblEmp record);
}