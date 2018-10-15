package com.ssm.util;


import java.util.List;

public class PageSupport {

	// 总页数
	private int totalPageCount;
	// 页面大小，即每页显示记录数
	private int pageSize = Constants.pageSize;
	// 记录总数
	private int totalCount;
	// 当前页码
	private int currPageNo;
	// 起始记录数
	private int start;
	// 每页标准号集合
	private List<?> lists;

	public List<?> getLists() {
		return lists;
	}

	public void setLists(List<?> lists) {
		this.lists = lists;
	}

	public int getStart() {
		return start;
	}

	public int getTotalPageCount() {
		return totalPageCount;
	}

	public void setTotalPageCount(int totalPageCount) {
		this.totalPageCount = totalPageCount;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		if (pageSize > 0) {
			this.pageSize = pageSize;
		}
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		if (totalCount > 0) {
			this.totalCount = totalCount;
			totalPageCount = this.totalCount % pageSize == 0 ? (this.totalCount / pageSize)
					: (this.totalCount / pageSize + 1);
		}else{
			this.totalCount = 0;
			totalPageCount = 0;
		}

	}

	public int getCurrPageNo() {
		return currPageNo;
	}

	public void setCurrPageNo(int currPageNo) {
		if (currPageNo > 0) {
			this.currPageNo = currPageNo;
			this.start = (currPageNo-1)*pageSize;
		}

	}


}
