package com.ssm.service;

import com.ssm.entity.TblEmp;

import java.util.List;

public interface EmployeeService {
    List<TblEmp> getAll(String condition);

    void saveEmp(TblEmp employee);

    boolean checkUse(String empName);

    TblEmp getEmp(Integer id);

    void updateEmp(TblEmp employee);

    void deleteEmp(Integer id);

    void deleteBatch(List<Integer> del_ids);
}
