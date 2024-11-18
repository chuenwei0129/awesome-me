import React, { useState, useEffect } from "react";
import { Table, Input, Button } from "antd";
const mockData = Array.from({ length: 100 }, (_, index) => ({
  key: `${index}`,
  name: `设备${index + 1}`,
  type: index % 2 === 0 ? "类型A" : "类型B",
  status: index % 3 === 0 ? "在线" : "离线",
}));
interface Device {
  key: string;
  name: string;
  type: string;
  status: string;
}

const DeviceCopyList: React.FC = () => {
  const [data, setData] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const [pagination, setPagination] = useState({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  });

  const columns = [
    {
      title: "设备名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "设备类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "设备状态",
      dataIndex: "status",
      key: "status",
    },
  ];

  const fetchData = async (
    pageNum: number,
    pageSize: number,
    searchText: string
  ) => {
    setLoading(true);
    // 模拟网络请求
    return new Promise<{ data: Device[]; total: number }>((resolve) => {
      setTimeout(() => {
        const startIndex = (pageNum - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        const filteredData = searchText
          ? mockData.filter((device) => device.name.includes(searchText))
          : mockData;
        const paginatedData = filteredData.slice(startIndex, endIndex);
        resolve({ data: paginatedData, total: filteredData.length });
      }, 1000);
    });
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    fetchData(1, pagination.pageSize, value).then((data) => {
      setData(data.data);
      setLoading(false);
      setPagination({ ...pagination, pageNum: 1, total: data.total });
    });
  };

  useEffect(() => {
    fetchData(pagination.pageNum, pagination.pageSize, searchText).then(
      (data) => {
        setData(data.data);
        setLoading(false);
        setPagination({ ...pagination, total: data.total });
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.pageNum, pagination.pageSize, searchText]);

  return (
    <div>
      <Input
        placeholder="输入设备名称搜索"
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ width: 200, marginBottom: 16 }}
      />
      <Button
        onClick={() => {
          handleSearch("");
          setPagination({ ...pagination, pageNum: 1 });
        }}
        style={{ marginLeft: 8 }}
      >
        重置
      </Button>
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        pagination={{
          ...pagination,
          total: pagination.total,
          onChange: (page, pageSize) => {
            setPagination({ ...pagination, pageNum: page, pageSize });
          },
        }}
      />
    </div
  );
};

export default DeviceCopyList;

