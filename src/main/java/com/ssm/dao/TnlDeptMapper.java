package com.ssm.dao;

import com.ssm.entity.TnlDept;
import com.ssm.entity.TnlDeptExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface TnlDeptMapper {
    long countByExample(TnlDeptExample example);

    int deleteByExample(TnlDeptExample example);

    int deleteByPrimaryKey(Integer deptId);

    int insert(TnlDept record);

    int insertSelective(TnlDept record);

    List<TnlDept> selectByExample(TnlDeptExample example);

    TnlDept selectByPrimaryKey(Integer deptId);

    int updateByExampleSelective(@Param("record") TnlDept record, @Param("example") TnlDeptExample example);

    int updateByExample(@Param("record") TnlDept record, @Param("example") TnlDeptExample example);

    int updateByPrimaryKeySelective(TnlDept record);

    int updateByPrimaryKey(TnlDept record);
}