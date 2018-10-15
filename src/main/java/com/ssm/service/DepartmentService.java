package com.ssm.service;

import com.ssm.dao.TnlDeptMapper;
import com.ssm.entity.TnlDept;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class DepartmentService {
    @Autowired
    private TnlDeptMapper tnlDeptMapper;
    public List<TnlDept> getAll() {
        List<TnlDept> list = tnlDeptMapper.selectByExample(null);
        return list;
    }
}
