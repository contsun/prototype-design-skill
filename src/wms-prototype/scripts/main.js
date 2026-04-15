// 简单的页面切换

// Hash 路由监听 - 支持直接访问 #page
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const navItem = document.querySelector(`[data-page="${hash}"]`);
    if (navItem) {
      navItem.click();
    }
  }
});

// 页面加载时检查 hash
if (window.location.hash) {
  setTimeout(() => {
    const hash = window.location.hash.replace('#', '');
    const navItem = document.querySelector(`[data-page="${hash}"]`);
    if (navItem) {
      navItem.click();
    }
  }, 100);
}
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    const page = item.dataset.page;
    if (!page) return;
    
    // 更新导航状态
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    
    // 显示/隐藏页面
    document.querySelectorAll('.page').forEach(p => {
      p.classList.remove('active');
    });
    const targetPage = document.getElementById('page-' + page);
    if (targetPage) {
      targetPage.classList.add('active');
    }
  });
});

// PDA账号页面功能
function initAccountsPage() {
  const filterWarehouse = document.getElementById('filter-warehouse');
  const filterStatus = document.getElementById('filter-status');
  const filterModel = document.getElementById('filter-model');
  const searchInput = document.getElementById('search-input');

  function filterPdaTable() {
    const warehouse = filterWarehouse?.value || '';
    const status = filterStatus?.value || '';
    const model = filterModel?.value || '';
    const search = searchInput?.value.toLowerCase() || '';
    const rows = document.querySelectorAll('#pda-table-body tr');
    
    rows.forEach(row => {
      const rowWarehouse = row.dataset.warehouse || '';
      const rowStatus = row.dataset.status || '';
      const text = row.textContent.toLowerCase();
      
      const matchWarehouse = !warehouse || rowWarehouse === warehouse;
      const matchStatus = !status || rowStatus === status;
      const matchModel = !model || text.includes(model.toLowerCase());
      const matchSearch = !search || text.includes(search);
      
      row.style.display = matchWarehouse && matchStatus && matchModel && matchSearch ? '' : 'none';
    });
  }

  filterWarehouse?.addEventListener('change', filterPdaTable);
  filterStatus?.addEventListener('change', filterPdaTable);
  filterModel?.addEventListener('change', filterPdaTable);
  searchInput?.addEventListener('input', filterPdaTable);
}

// PDA详情弹窗
window.showPdaDetail = function(deviceId) {
  const mockData = {
    'PDA-2026-001': { model: 'MC50', user: '张伟', warehouse: '北京仓', status: '在线', battery: '85%', lastOnline: '2026-04-09 18:45' },
    'PDA-2026-002': { model: 'MC50', user: '李娜', warehouse: '北京仓', status: '在线', battery: '62%', lastOnline: '2026-04-09 18:42' },
    'PDA-2026-003': { model: 'MC70', user: '王强', warehouse: '上海仓', status: '在线', battery: '40%', lastOnline: '2026-04-09 18:30' },
    'PDA-2026-004': { model: 'MC90', user: '赵鹏', warehouse: '上海仓', status: '离线', battery: '15%', lastOnline: '2026-04-09 08:15' },
    'PDA-2026-005': { model: 'DT40', user: '陈静', warehouse: '广州仓', status: '在线', battery: '92%', lastOnline: '2026-04-09 18:48' },
    'PDA-2026-006': { model: 'MC50', user: '周涛', warehouse: '广州仓', status: '离线', battery: '5%', lastOnline: '2026-04-08 22:30' },
    'PDA-2026-007': { model: 'MC70', user: '吴昊', warehouse: '成都仓', status: '在线', battery: '35%', lastOnline: '2026-04-09 18:20' },
    'PDA-2026-008': { model: 'DT40', user: '郑鑫', warehouse: '成都仓', status: '离线', battery: '0%', lastOnline: '2026-04-09 06:45' }
  };
  const data = mockData[deviceId] || {};
  alert(`设备详情\n\n编号：${deviceId}\n型号：${data.model}\n绑定人：${data.user}\n仓库：${data.warehouse}\n状态：${data.status}\n电量：${data.battery}\n最后在线：${data.lastOnline}`);
};

window.unbindPda = function(deviceId) {
  if (confirm(`确定要解绑设备 ${deviceId} 吗？`)) {
    alert('设备已解绑');
  }
};

// 角色权限功能
function initRolesPage() {
  const rolePermissions = {
    admin: ['dashboard:view','dashboard:export','staff:view','staff:add','staff:edit','accounts:view','accounts:bind','warehouse:view','products:view','wave:view','wave:add','sorting:view','picking:view','picking:execute','processing:view','location:view','location:edit','inventory:query','inventory:adjust','alert:view','stocktake:view','purchase:view','transfer:view','delivery:view','statistics:view','statistics:export'],
    manager: ['dashboard:view','dashboard:export','staff:view','accounts:view','warehouse:view','products:view','wave:view','wave:add','sorting:view','picking:view','processing:view','location:view','inventory:query','alert:view','stocktake:view','purchase:view','transfer:view','delivery:view','statistics:view','statistics:export'],
    picker: ['dashboard:view','picking:view','picking:execute','inventory:query','location:view'],
    sorter: ['dashboard:view','sorting:view','picking:view','inventory:query','location:view'],
    receiver: ['dashboard:view','staff:view','purchase:view','inventory:query','inventory:adjust','location:view'],
    viewer: ['dashboard:view']
  };

  window.editRole = function(roleId) {
    document.querySelectorAll('.role-row').forEach(row => row.style.background = '');
    const selectedRow = document.querySelector(`[data-role="${roleId}"]`);
    if (selectedRow) selectedRow.style.background = '#f5f5f5';
    
    const permissions = rolePermissions[roleId] || [];
    document.querySelectorAll('.perm-item').forEach(checkbox => {
      checkbox.checked = permissions.includes(checkbox.dataset.perm);
    });
    
    document.querySelectorAll('.perm-module-check').forEach(moduleCheck => {
      const module = moduleCheck.dataset.module;
      const moduleItems = document.querySelectorAll(`.perm-item[data-perm^="${module}:"]`);
      const checkedCount = Array.from(moduleItems).filter(i => i.checked).length;
      moduleCheck.checked = checkedCount > 0;
      moduleCheck.indeterminate = checkedCount > 0 && checkedCount < moduleItems.length;
    });
  };

  window.savePermissions = function() {
    const selectedRole = document.querySelector('.role-row[style*="background"]') || document.querySelector('.role-row[data-role="manager"]');
    const roleId = selectedRole?.dataset.role || 'manager';
    const enabledPerms = Array.from(document.querySelectorAll('.perm-item:checked')).map(c => c.dataset.perm);
    rolePermissions[roleId] = enabledPerms;
    alert(`权限已保存！共 ${enabledPerms.length} 项权限`);
  };

  // 模块全选逻辑
  document.querySelectorAll('.perm-module-check').forEach(moduleCheck => {
    moduleCheck.addEventListener('change', function() {
      const module = this.dataset.module;
      const checked = this.checked;
      document.querySelectorAll(`.perm-item[data-perm^="${module}:"]`).forEach(item => {
        item.checked = checked;
      });
    });
  });

  document.querySelectorAll('.perm-item').forEach(item => {
    item.addEventListener('change', function() {
      const perm = this.dataset.perm;
      const module = perm.split(':')[0];
      const moduleCheck = document.querySelector(`.perm-module-check[data-module="${module}"]`);
      const moduleItems = document.querySelectorAll(`.perm-item[data-perm^="${module}:"]`);
      const checkedCount = Array.from(moduleItems).filter(i => i.checked).length;
      moduleCheck.checked = checkedCount === moduleItems.length;
      moduleCheck.indeterminate = checkedCount > 0 && checkedCount < moduleItems.length;
    });
  });

  document.getElementById('role-search')?.addEventListener('input', function() {
    const search = this.value.toLowerCase();
    document.querySelectorAll('.role-row').forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(search) ? '' : 'none';
    });
  });

  // 默认选中仓管主管
  setTimeout(() => editRole('manager'), 100);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  // 初始化角色权限页面
  if (document.querySelector('#page-roles')) {
    initRolesPage();
  }
  // 初始化PDA账号页面  
  if (document.querySelector('#page-accounts')) {
    initAccountsPage();
  }
});

// ========== 采购退货管理弹窗函数 ==========
function showReturnDetail(returnId) {
  document.getElementById('returnDetailModal').style.display = 'flex';
  document.getElementById('detail-return-no').textContent = returnId;
}

function closeReturnDetail() {
  document.getElementById('returnDetailModal').style.display = 'none';
}

function confirmReturnOutboundFromDetail() {
  alert('确认出库成功');
  closeReturnDetail();
}

function openBatchConfirmReturn() {
  document.getElementById('batchReturnModal').style.display = 'flex';
}

function closeBatchReturnModal() {
  document.getElementById('batchReturnModal').style.display = 'none';
}

function submitBatchReturn() {
  alert('批量退运出库已确认');
  closeBatchReturnModal();
  location.reload();
}

function toggleAllReturn(checkbox) {
  document.querySelectorAll('.return-checkbox').forEach(cb => {
    cb.checked = checkbox.checked;
  });
}

// ========== 售后退货管理弹窗函数 ==========
function showAfterSalesDetail(id) {
  document.getElementById('afterSalesDetailModal').style.display = 'flex';
  document.getElementById('detail-as-return-no').textContent = id;
}

function closeAfterSalesDetail() {
  document.getElementById('afterSalesDetailModal').style.display = 'none';
}

function receiveAfterSales(id) {
  if (confirm('确认接收退件 ' + id + '？')) {
    alert('退件已接收');
    location.reload();
  }
}

function appraiseItem(id) {
  document.getElementById('appraisalModal').style.display = 'flex';
}

function appraiseItemFromDetail() {
  closeAfterSalesDetail();
  document.getElementById('appraisalModal').style.display = 'flex';
}

function reAppraiseItem(id) {
  document.getElementById('appraisalModal').style.display = 'flex';
}

function closeAppraisalModal() {
  document.getElementById('appraisalModal').style.display = 'none';
}

function decreaseQty() {
  const input = document.getElementById('appraisal-qty');
  if (parseInt(input.value) > 0) {
    input.value = parseInt(input.value) - 1;
  }
}

function increaseQty() {
  const input = document.getElementById('appraisal-qty');
  if (parseInt(input.value) < 6) {
    input.value = parseInt(input.value) + 1;
  }
}

function onResultChange() {
  const result = document.getElementById('appraisal-result').value;
  const destSelect = document.getElementById('appraisal-dest');
  if (result === 'goods') destSelect.value = 'goods-area';
  else if (result === 'defective') destSelect.value = 'defective-area';
  else if (result === 'scrapped') destSelect.value = 'scrapped-area';
}

function submitAppraisal() {
  const qty = document.getElementById('appraisal-qty').value;
  const condition = document.getElementById('appraisal-condition').value;
  const result = document.getElementById('appraisal-result').value;
  const dest = document.getElementById('appraisal-dest').value;
  const desc = document.getElementById('appraisal-desc').value;
  
  if (!qty || !condition || !result || !dest || !desc) {
    alert('请填写完整的鉴定信息');
    return;
  }
  
  if (desc.length < 10) {
    alert('鉴定说明至少10个字');
    return;
  }
  
  alert('鉴定信息已提交');
  closeAppraisalModal();
  location.reload();
}

// 点击弹窗外部关闭
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('returnDetailModal')?.addEventListener('click', function(e) {
    if (e.target === this) closeReturnDetail();
  });
  document.getElementById('batchReturnModal')?.addEventListener('click', function(e) {
    if (e.target === this) closeBatchReturnModal();
  });
  document.getElementById('afterSalesDetailModal')?.addEventListener('click', function(e) {
    if (e.target === this) closeAfterSalesDetail();
  });
  document.getElementById('appraisalModal')?.addEventListener('click', function(e) {
    if (e.target === this) closeAppraisalModal();
  });
});

// ========== Tab切换函数 ==========
function switchReturnTab(tabName) {
  document.querySelectorAll('.return-tab').forEach(tab => tab.style.display = 'none');
  document.getElementById('return-' + tabName).style.display = 'block';
  const tabs = document.querySelectorAll('#page-purchase_return .tabs > .tab');
  tabs.forEach(t => {
    t.style.background = '#F3F4F6';
    t.style.color = '#6B7280';
  });
  event.target.style.background = '#EEF2FF';
  event.target.style.color = '#4F46E5';
}

function switchAfterSalesTab(tabName) {
  document.querySelectorAll('.aftersales-tab').forEach(tab => tab.style.display = 'none');
  document.getElementById('aftersales-' + tabName).style.display = 'block';
  const tabs = document.querySelectorAll('#page-after_sales .tabs > .tab');
  tabs.forEach(t => {
    t.style.background = '#F3F4F6';
    t.style.color = '#6B7280';
  });
  event.target.style.background = '#EEF2FF';
  event.target.style.color = '#4F46E5';
}


// ========== Tab切换函数 ==========
function switchAlertTab(tabName) {
        document.querySelectorAll('.alert-tab').forEach(tab => tab.style.display = 'none');
        document.getElementById('alert-' + tabName).style.display = 'block';
        document.querySelectorAll('.alert-tab').forEach(() => {});
        const tabs = document.querySelectorAll('#page-alert .tabs > .tab');
        tabs.forEach(t => {
          t.style.background = '#F3F4F6';
          t.style.color = '#6B7280';
        });
        event.target.style.background = '#EEF2FF';
        event.target.style.color = '#4F46E5';
      }

function switchAsnTab(tabName) {
        document.querySelectorAll('.asn-tab').forEach(tab => tab.style.display = 'none');
        document.getElementById('asn-' + tabName).style.display = 'block';
        const tabs = document.querySelectorAll('#page-asn .tabs > .tab');
        tabs.forEach(t => {
          t.style.background = '#F3F4F6';
          t.style.color = '#6B7280';
        });
        event.target.style.background = '#EEF2FF';
        event.target.style.color = '#4F46E5';
      }

function switchCustomerTab(tabName) {
        document.querySelectorAll('.customer-tab').forEach(tab => tab.style.display = 'none');
        document.getElementById('customer-' + tabName).style.display = 'block';
        const tabs = document.querySelectorAll('#page-customer .tabs > .tab');
        tabs.forEach(t => {
          t.style.background = '#F3F4F6';
          t.style.color = '#6B7280';
        });
        event.target.style.background = '#EEF2FF';
        event.target.style.color = '#4F46E5';
      }

function switchDamageTab(tabName) {
        document.querySelectorAll('.damage-tab').forEach(tab => tab.style.display = 'none');
        document.getElementById('damage-' + tabName).style.display = 'block';
        const tabs = document.querySelectorAll('#page-exception_damage .tabs > .tab');
        tabs.forEach(t => {
          t.style.background = '#F3F4F6';
          t.style.color = '#6B7280';
        });
        event.target.style.background = '#EEF2FF';
        event.target.style.color = '#4F46E5';
      }

function switchDeliveryReturnTab(tabName) {
        document.querySelectorAll('.return-tab').forEach(tab => tab.style.display = 'none');
        document.getElementById('return-' + tabName).style.display = 'block';
        const tabs = document.querySelectorAll('#page-delivery_return .tabs > .tab');
        tabs.forEach(t => {
          t.style.background = '#F3F4F6';
          t.style.color = '#6B7280';
        });
        event.target.style.background = '#EEF2FF';
        event.target.style.color = '#4F46E5';
      }

function switchDeliveryTab(tabName) {
        document.querySelectorAll('.delivery-tab').forEach(tab => tab.style.display = 'none');
        document.getElementById('delivery-' + tabName).style.display = 'block';
        const tabs = document.querySelectorAll('#page-delivery .tabs > .tab');
        tabs.forEach(t => {
          t.style.background = '#F3F4F6';
          t.style.color = '#6B7280';
        });
        event.target.style.background = '#EEF2FF';
        event.target.style.color = '#4F46E5';
      }

function switchDisposalTab(tabName) {
        document.querySelectorAll('.disposal-tab').forEach(tab => tab.style.display = 'none');
        document.getElementById('disposal-' + tabName).style.display = 'block';
        const tabs = document.querySelectorAll('#page-exception_disposal .tabs > .tab');
        tabs.forEach(t => {
          t.style.background = '#F3F4F6';
          t.style.color = '#6B7280';
        });
        event.target.style.background = '#EEF2FF';
        event.target.style.color = '#4F46E5';
      }

function switchExceptionTab(tabName) {
        document.querySelectorAll('.exception-tab').forEach(tab => tab.style.display = 'none');
        document.getElementById('exception-' + tabName).style.display = 'block';
        const tabs = document.querySelectorAll('#page-exception_complaint .tabs > .tab');
        tabs.forEach(t => {
          t.style.background = '#F3F4F6';
          t.style.color = '#6B7280';
        });
        event.target.style.background = '#EEF2FF';
        event.target.style.color = '#4F46E5';
      }

function switchInboundTab(tabName) {
        document.querySelectorAll('.inbound-tab').forEach(tab => tab.style.display = 'none');
        document.getElementById('inbound-' + tabName).style.display = 'block';
        const tabs = document.querySelectorAll('#page-log_inbound .tabs > .tab');
        tabs.forEach(t => {
          t.style.background = '#F3F4F6';
          t.style.color = '#6B7280';
        });
        event.target.style.background = '#EEF2FF';
        event.target.style.color = '#4F46E5';
      }

function switchInterfaceTab(tabName) {
        document.querySelectorAll('.interface-tab').forEach(tab => tab.style.display = 'none');
        document.getElementById('interface-' + tabName).style.display = 'block';
        const tabs = document.querySelectorAll('#page-log_interface .tabs > .tab');
        tabs.forEach(t => {
          t.style.background = '#F3F4F6';
          t.style.color = '#6B7280';
        });
        event.target.style.background = '#EEF2FF';
        event.target.style.color = '#4F46E5';
      }

function switchLocationTab(tabName) {
        document.querySelectorAll('.location-tab').forEach(tab => tab.style.display = 'none');
        document.getElementById('tab-' + tabName).style.display = 'block';
        const tabs = document.querySelectorAll('#page-location .tabs > .tab');
        const tabMap = {zone:0, location:1, loading:2, strategy:3};
        tabs.forEach((btn, i) => {
          if (i === tabMap[tabName]) {
            btn.style.color = '#4F46E5';
            btn.style.borderBottomColor = '#4F46E5';
          } else {
            btn.style.color = '#6B7280';
            btn.style.borderBottomColor = 'transparent';
          }
        });
      }

function switchModuleTab(tabName) {
        document.querySelectorAll('.module-tab').forEach(tab => tab.style.display = 'none');
        document.getElementById('module-' + tabName).style.display = 'block';
        const tabs = document.querySelectorAll('#page-system_module .tabs > .tab');
        tabs.forEach(t => {
          t.style.background = '#F3F4F6';
          t.style.color = '#6B7280';
        });
        event.target.style.background = '#EEF2FF';
        event.target.style.color = '#4F46E5';
      }

function switchProcessingTab(tabName) {
        document.querySelectorAll('.processing-tab').forEach(t => t.style.display = 'none');
        document.getElementById('processing-' + tabName).style.display = 'block';
        const tabs = document.querySelectorAll('#page-processing .tabs > .tab');
        tabs.forEach((t, i) => {
          const tabMap = {producing:0, completed:1, cancelled:2, inbound:3, allocation:4};
          if (i === tabMap[tabName]) {
            t.style.background = '#EEF2FF';
            t.style.color = '#4F46E5';
          } else {
            t.style.background = '#F3F4F6';
            t.style.color = '#6B7280';
          }
        });
      }

function switchSelfPickupTab(tabName) {
        document.querySelectorAll('.pickup-tab').forEach(tab => tab.style.display = 'none');
        document.getElementById('pickup-' + tabName).style.display = 'block';
        const tabs = document.querySelectorAll('#page-self_pickup .tabs > .tab');
        tabs.forEach(t => {
          t.style.background = '#F3F4F6';
          t.style.color = '#6B7280';
        });
        event.target.style.background = '#EEF2FF';
        event.target.style.color = '#4F46E5';
      }

function switchStatisticsTab(tabName) {
        document.querySelectorAll('.statistics-tab').forEach(tab => tab.style.display = 'none');
        document.getElementById('statistics-' + tabName).style.display = 'block';
        const tabs = document.querySelectorAll('#page-statistics .tabs > .tab');
        tabs.forEach(t => {
          t.style.background = '#F3F4F6';
          t.style.color = '#6B7280';
        });
        event.target.style.background = '#EEF2FF';
        event.target.style.color = '#4F46E5';
      }

function switchStocktakeTab(tabName) {
        document.querySelectorAll('.stocktake-tab').forEach(tab => tab.style.display = 'none');
        document.getElementById('stocktake-' + tabName).style.display = 'block';
        const tabs = document.querySelectorAll('#page-stocktake .tabs > .tab');
        const tabMap = {plan:0, diff:1, approve:2};
        tabs.forEach((btn, i) => {
          if (i === tabMap[tabName]) {
            btn.style.color = '#4F46E5';
            btn.style.borderBottomColor = '#4F46E5';
          } else {
            btn.style.color = '#6B7280';
            btn.style.borderBottomColor = 'transparent';
          }
        });
      }

function switchSupplierTab(tabName) {
        document.querySelectorAll('.supplier-tab').forEach(tab => tab.style.display = 'none');
        document.getElementById('supplier-' + tabName).style.display = 'block';
        const tabs = document.querySelectorAll('#page-supplier .tabs > .tab');
        tabs.forEach(t => {
          t.style.background = '#F3F4F6';
          t.style.color = '#6B7280';
        });
        event.target.style.background = '#EEF2FF';
        event.target.style.color = '#4F46E5';
      }

function switchTransferTab(tabName) {
        document.querySelectorAll('.transfer-tab').forEach(tab => tab.style.display = 'none');
        document.getElementById('transfer-' + tabName).style.display = 'block';
        const tabs = document.querySelectorAll('#page-transfer .tabs > .tab');
        tabs.forEach(t => {
          t.style.background = '#F3F4F6';
          t.style.color = '#6B7280';
        });
        event.target.style.background = '#EEF2FF';
        event.target.style.color = '#4F46E5';
      }

function switchUserTab(tabName) {
        document.querySelectorAll('.user-tab').forEach(tab => tab.style.display = 'none');
        document.getElementById('user-' + tabName).style.display = 'block';
        const tabs = document.querySelectorAll('#page-system_user .tabs > .tab');
        tabs.forEach(t => {
          t.style.background = '#F3F4F6';
          t.style.color = '#6B7280';
        });
        event.target.style.background = '#EEF2FF';
        event.target.style.color = '#4F46E5';
      }



// ========== 弹窗函数 ==========
function addDefect() {
        alert('次品已登记');
      }

function addPurchaseItem() {
        alert('添加商品功能 - 可选择SKU并添加到列表');
      }

function addToBlacklist() {
        if (confirm('确定要将该供应商加入黑名单？')) {
          alert('已加入黑名单');
          closeSupplierDetailModal();
        }
      }

function approveDiff(code) { alert('放行: ' + code); }

function assignDock(code) { alert('分配月台: ' + code); }

function autoMatchAllocation() {
        alert('智能匹配完成，已自动分配 50 箱到缺货波次');
      }

function batchRecheck() { alert('批量发起复盘'); }

function cancelProcessing() {
        if (confirm('确定要取消该加工单？')) {
          alert('加工单已取消');
          closeProcessingDetailModal();
        }
      }

function closeAddChildModal() {
        var m = document.getElementById('modal-add-child');
        m.style.display = 'none';
        document.body.style.overflow = '';
      }

function closeAddDeviceModal() { var m=document.getElementById('modal-add-device');m.style.display='none';document.body.style.overflow=''; }

function closeAddPickingModal() {
        var m = document.getElementById('modal-add-picking');
        m.style.display = 'none';
        document.body.style.overflow = '';
      }

function closeAddProcessingModal() {
        var m = document.getElementById('modal-add-processing');
        m.style.display = 'none';
        document.body.style.overflow = '';
      }

function closeAddProductModal() {
        var m = document.getElementById('modal-add-product');
        m.style.display = 'none';
        document.body.style.overflow = '';
      }

function closeAddSortingModal() {
        var m = document.getElementById('modal-add-sorting');
        m.style.display = 'none';
        document.body.style.overflow = '';
      }

function closeAddStaffModal() { var m=document.getElementById('modal-add-staff');m.style.display='none';document.body.style.overflow=''; }

function closeAddSupplierModal() {
        var m = document.getElementById('modal-add-supplier');
        m.style.display = 'none';
        document.body.style.overflow = '';
      }

function closeAddZoneModal() {
        var m = document.getElementById('modal-add-zone');
        m.style.display = 'none';
        document.body.style.overflow = '';
      }

function closeApproveModal() {
        var m = document.getElementById('modal-approve');
        m.style.display = 'none';
        document.body.style.overflow = '';
      }

function closeAsnDetail() {
        document.getElementById('asnDetailModal').style.display = 'none';
      }

function closeBomModal() {
        var m = document.getElementById('modal-bom');
        m.style.display = 'none';
        document.body.style.overflow = '';
      }

function closeDetailModal() { var m=document.getElementById('modal-staff-detail');m.style.display='none';document.body.style.overflow=''; }

function closeDeviceDetailModal() { var m=document.getElementById('modal-device-detail');m.style.display='none';document.body.style.overflow=''; }

function closeEditStaffModal() { var m=document.getElementById('modal-edit-staff');m.style.display='none';document.body.style.overflow=''; }

function closeEditSupplierModal() {
        var m = document.getElementById('modal-edit-supplier');
        m.style.display = 'none';
        document.body.style.overflow = '';
      }

function closeNewPurchaseModal() {
        document.getElementById('newPurchaseModal').style.display = 'none';
      }

function closeNewStocktakeModal() {
        var m = document.getElementById('modal-new-stocktake');
        m.style.display = 'none';
        document.body.style.overflow = '';
      }

function closePackModal() {
        var m = document.getElementById('modal-pack');
        m.style.display = 'none';
        document.body.style.overflow = '';
      }

function closePickingDetailModal() {
        var m = document.getElementById('modal-picking-detail');
        m.style.display = 'none';
        document.body.style.overflow = '';
      }

function closeProcessingDetailModal() {
        var m = document.getElementById('modal-processing-detail');
        m.style.display = 'none';
        document.body.style.overflow = '';
      }

function closeProductDetailModal() {
        var m = document.getElementById('modal-product-detail');
        m.style.display = 'none';
        document.body.style.overflow = '';
      }

function closeRescheduleModal() {
        document.getElementById('rescheduleModal').style.display = 'none';
      }

function closeSortingDetailModal() {
        var m = document.getElementById('modal-sorting-detail');
        m.style.display = 'none';
        document.body.style.overflow = '';
      }

function closeSupplierDetailModal() {
        var m = document.getElementById('modal-supplier-detail');
        m.style.display = 'none';
        document.body.style.overflow = '';
      }

function closeWarehouseModal() {
        var m = document.getElementById('modal-warehouse');
        m.style.display = 'none';
        document.body.style.overflow = '';
      }

function closeWaveDetailModal() {
        var m = document.getElementById('modal-wave-detail');
        m.style.display = 'none';
        document.body.style.overflow = '';
      }

function closeWaveModal() {
        var m = document.getElementById('modal-wave');
        m.style.display = 'none';
        document.body.style.overflow = '';
      }

function closeZoneDetailModal() {
        var m = document.getElementById('modal-zone-detail');
        m.style.display = 'none';
        document.body.style.overflow = '';
      }

function completePack() {
        alert('打包完成');
        closePackModal();
      }

function deleteStocktakePlan(code) { 
        if (confirm('确认删除该盘点计划？')) alert('删除: ' + code); 
      }

function deleteWave() {
        if (confirm('确定要删除该策略？删除后不可恢复。')) {
          alert('策略已删除');
          closeWaveDetailModal();
        }
      }

function editStocktakePlan(code) { alert('编辑盘点计划: ' + code); }

function editWarehouse(code) {
        document.getElementById('warehouse-modal-title').textContent = '编辑仓库';
        document.getElementById('warehouse-code').value = code;
        var m = document.getElementById('modal-warehouse');
        m.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }

function exportAfterSalesList() {
        alert('导出退件列表');
      }

function exportLocation() { alert('导出货位数据'); }

function exportPicking() {
        alert('导出拣货单据');
      }

function exportProcessing() {
        alert('导出加工作业数据');
      }

function exportReturnList() {
        alert('导出退货列表');
      }

function exportSorting() {
        alert('导出分拣单据');
      }

function exportStocktake() { alert('导出演示'); }

function handleException(no) {
        alert('处理分拣异常：' + no);
      }

function handleLocationError(code) { alert('处理异常: ' + code); }

function handlePickingException(no) {
        alert('处理拣货异常：' + no);
      }

function issueStocktake(code) { alert('下发盘点: ' + code); }

function issueStocktakePlan() {
        alert('盘点计划已下发');
        closeNewStocktakeModal();
      }

function kickOffline(mac) { alert('设备 '+mac+' 已强制下线'); }

function lockLocation(code) { alert('锁定库位: ' + code); }

function markException(no) {
        if (!no) no = '当前分拣单';
        alert('打开异常标记：' + no);
      }

function markPickingException(no) {
        if (!no) no = '当前拣货单';
        alert('打开异常标记：' + no);
      }

function openAddChildModal(parentId, parentName) {
        currentParentId = parentId;
        document.getElementById('parent-warehouse-name').textContent = parentName;
        document.getElementById('child-code').value = '';
        document.getElementById('child-name').value = '';
        document.getElementById('child-type').value = '';
        document.getElementById('child-category').value = '';
        document.getElementById('child-contact').value = '';
        document.getElementById('child-phone').value = '';
        document.getElementById('child-address').value = '';
        var m = document.getElementById('modal-add-child');
        m.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }

function openAddDeviceModal() { var m=document.getElementById('modal-add-device');m.style.display='flex';document.body.style.overflow='hidden'; }

function openAddPickingModal() {
        var m = document.getElementById('modal-add-picking');
        m.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }

function openAddProcessingModal() {
        var m = document.getElementById('modal-add-processing');
        m.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }

function openAddProductModal() {
        var m = document.getElementById('modal-add-product');
        m.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }

function openAddSortingModal() {
        var m = document.getElementById('modal-add-sorting');
        m.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }

function openAddStaffModal() { var m=document.getElementById('modal-add-staff');m.style.display='flex';document.body.style.overflow='hidden'; }

function openAddSupplierModal() {
        var m = document.getElementById('modal-add-supplier');
        m.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }

function openAddWarehouseModal() {
        document.getElementById('warehouse-modal-title').textContent = '新增仓库';
        document.getElementById('warehouse-code').value = '';
        document.getElementById('warehouse-name').value = '';
        document.getElementById('warehouse-type').value = '';
        document.getElementById('warehouse-parent').value = '';
        document.getElementById('warehouse-category').value = '';
        document.getElementById('warehouse-status').value = 'enabled';
        document.getElementById('warehouse-contact').value = '';
        document.getElementById('warehouse-phone').value = '';
        document.getElementById('warehouse-address').value = '';
        var m = document.getElementById('modal-warehouse');
        m.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }

function openAddWaveModal() {
        document.getElementById('wave-modal-title').textContent = '新建策略';
        document.getElementById('wave-code').value = '';
        document.getElementById('wave-name').value = '';
        document.getElementById('wave-warehouse').value = '';
        document.getElementById('wave-line').value = '';
        document.getElementById('wave-trigger').value = '';
        document.getElementById('wave-threshold').value = '100';
        document.getElementById('wave-time-start').value = '14:00';
        document.getElementById('wave-time-end').value = '16:00';
        document.getElementById('wave-desc').value = '';
        var m = document.getElementById('modal-wave');
        m.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }

function openAddZoneModal() {
        var m = document.getElementById('modal-add-zone');
        m.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }

function openApproveModal(code) {
        document.getElementById('approve-code').textContent = code;
        var m = document.getElementById('modal-approve');
        m.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }

function openBomModal(code) {
        if (code) document.getElementById('bom-processing-no').textContent = code;
        var m = document.getElementById('modal-bom');
        m.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }

function openDetailModal(name,position,id,gender) { var m=document.getElementById('modal-staff-detail');m.style.display='flex';document.body.style.overflow='hidden'; document.getElementById('detail-name').textContent=name||''; document.getElementById('detail-position').textContent=position||''; document.getElementById('detail-id').textContent=id||''; document.getElementById('detail-gender').textContent=gender||''; }

function openEditProductModal() {
        alert('打开编辑商品弹窗');
      }

function openEditStaffModal(name,id) { var m=document.getElementById('modal-edit-staff');m.style.display='flex';document.body.style.overflow='hidden'; document.getElementById('edit-staff-id').value=id||''; document.getElementById('edit-staff-name').value=name||''; }

function openEditStaffModalFromDetail() { var m=document.getElementById('modal-edit-staff');m.style.display='flex';document.body.style.overflow='hidden'; }

function openEditStrategyModal(code) { alert('编辑策略: ' + code); }

function openEditSupplierModal(code) {
        if (code) {
          document.getElementById('edit-supplier-code').value = code;
        }
        var m = document.getElementById('modal-edit-supplier');
        m.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }

function openEditWaveModal(code) {
        if (code) {
          document.getElementById('wave-modal-title').textContent = '编辑策略';
          document.getElementById('wave-code').value = code;
        }
        var m = document.getElementById('modal-wave');
        m.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }

function openEditZoneModal(code) {
        alert('编辑库区: ' + code);
      }

function openNewPurchaseModal() {
        document.getElementById('newPurchaseModal').style.display = 'flex';
      }

function openNewStocktakeModal() {
        var m = document.getElementById('modal-new-stocktake');
        m.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }

function openPackPanel(code) {
        if (code) document.getElementById('pack-processing-no').textContent = code;
        var m = document.getElementById('modal-pack');
        m.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }

function openRescheduleModal(asnNo) {
        document.getElementById('rescheduleModal').style.display = 'flex';
      }

function passApproval() {
        alert('审批通过');
        closeApproveModal();
      }

function rePicking(no) {
        if (!no) no = '当前拣货单';
        if (confirm('确定要对拣货单 ' + no + ' 进行重新拣货？')) {
          alert('已触发重新拣货');
          closePickingDetailModal();
        }
      }

function reSorting(no) {
        if (confirm('确定要对分拣单 ' + no + ' 进行重新分拣？')) {
          alert('已触发重新分拣');
        }
      }

function recheckDiff(code) { alert('发起复盘: ' + code); }

function rejectApproval() {
        alert('审批驳回');
        closeApproveModal();
      }

function rejectDiff(code) { alert('拒绝: ' + code); }

function renewSupplier(code) {
        alert('打开供应商续签流程：' + code);
      }

function resetAfterSalesList() {
        document.querySelector('input[placeholder="输入单号搜索"]').value = '';
        document.querySelectorAll('.filter-input')[1].value = '';
        document.querySelectorAll('.filter-input')[2].value = '';
        document.querySelectorAll('.filter-select')[1].value = '全部';
        document.querySelectorAll('.filter-select')[2].value = '全部';
        document.querySelectorAll('.filter-input[type="date"]')[0].value = '2026-04-01';
        document.querySelectorAll('.filter-input[type="date"]')[1].value = '2026-04-13';
      }

function resetPwd(mac) { alert('设备 '+mac+' 密码已重置'); }

function resetReturnList() {
        // 重置所有筛选条件
        document.querySelector('input[placeholder="输入单号搜索"]').value = '';
        document.querySelectorAll('.filter-select')[0].value = '全部供应商';
        document.querySelectorAll('.filter-input')[1].value = '';
        document.querySelectorAll('.filter-select')[1].value = '全部原因';
        document.querySelectorAll('.filter-select')[2].value = '全部';
        document.querySelectorAll('.filter-input[type="date"]')[0].value = '2026-04-01';
        document.querySelectorAll('.filter-input[type="date"]')[1].value = '2026-04-13';
      }

function saveAddDevice() { alert('设备添加成功');closeAddDeviceModal(); }

function saveAddPicking() {
        var warehouse = document.getElementById('picking-warehouse').value;
        var line = document.getElementById('picking-line').value;
        if (!warehouse || !line) {
          alert('请选择仓库和线路');
          return;
        }
        alert('拣货单创建成功');
        closeAddPickingModal();
      }

function saveAddProcessing() {
        var warehouse = document.getElementById('processing-warehouse').value;
        var sku = document.getElementById('processing-product-sku').value;
        if (!warehouse || !sku) {
          alert('请填写必填项');
          return;
        }
        alert('加工单创建成功');
        closeAddProcessingModal();
      }

function saveAddProduct() {
        var name = document.getElementById('add-product-name').value;
        if (!name) { alert('请输入商品名称'); return; }
        alert('商品保存成功');
        closeAddProductModal();
      }

function saveAddSorting() {
        var warehouse = document.getElementById('sorting-warehouse').value;
        var line = document.getElementById('sorting-line').value;
        if (!warehouse || !line) {
          alert('请选择仓库和线路');
          return;
        }
        alert('分拣单创建成功');
        closeAddSortingModal();
      }

function saveAddStaff() { alert('保存成功');closeAddStaffModal(); }

function saveAddSupplier() {
        var name = document.getElementById('add-supplier-name').value;
        if (!name) { alert('请输入供应商名称'); return; }
        alert('供应商保存成功');
        closeAddSupplierModal();
      }

function saveAddZone() {
        alert('库区保存成功');
        closeAddZoneModal();
      }

function saveBom() {
        alert('BOM配料单已保存');
        closeBomModal();
      }

function saveChildWarehouse() {
        var name = document.getElementById('child-name').value;
        if (!name) { alert('请输入仓库名称'); return; }
        alert('下级仓库保存成功');
        closeAddChildModal();
      }

function saveEditStaff() { alert('修改成功');closeEditStaffModal(); }

function saveEditSupplier() {
        alert('供应商修改成功');
        closeEditSupplierModal();
      }

function saveStocktakeDraft() {
        alert('盘点计划已保存为草稿');
        closeNewStocktakeModal();
      }

function saveWarehouse() {
        var name = document.getElementById('warehouse-name').value;
        if (!name) { alert('请输入仓库名称'); return; }
        alert('仓库保存成功');
        closeWarehouseModal();
      }

function saveWave() {
        var name = document.getElementById('wave-name').value;
        if (!name) { alert('请输入策略名称'); return; }
        alert('策略保存成功');
        closeWaveModal();
      }

function scanPackBarcode() {
        var barcode = document.getElementById('pack-barcode').value;
        if (barcode) {
          var current = parseInt(document.getElementById('pack-total').textContent);
          document.getElementById('pack-total').textContent = current + 1;
          document.getElementById('pack-barcode').value = '';
        }
      }

function searchAfterSalesList() {
        const returnNo = document.querySelector('input[placeholder="输入单号搜索"]').value;
        const leader = document.querySelectorAll('.filter-input')[1].value;
        const sku = document.querySelectorAll('.filter-input')[2].value;
        const result = document.querySelectorAll('.filter-select')[1].value;
        const status = document.querySelectorAll('.filter-select')[2].value;
        const dateFrom = document.querySelectorAll('.filter-input[type="date"]')[0].value;
        const dateTo = document.querySelectorAll('.filter-input[type="date"]')[1].value;
        
        alert('筛选条件：\\n单号：' + (returnNo || '全部') + '\\n团长：' + (leader || '全部') + '\\nSKU：' + (sku || '全部') + '\\n鉴定结果：' + result + '\\n状态：' + status + '\\n日期：' + dateFrom + ' ~ ' + dateTo);
      }

function searchReturnList() {
        // 获取筛选条件
        const returnNo = document.querySelector('input[placeholder="输入单号搜索"]').value;
        const supplier = document.querySelectorAll('.filter-select')[0].value;
        const sku = document.querySelectorAll('.filter-input')[1].value;
        const reason = document.querySelectorAll('.filter-select')[1].value;
        const status = document.querySelectorAll('.filter-select')[2].value;
        const dateFrom = document.querySelectorAll('.filter-input[type="date"]')[0].value;
        const dateTo = document.querySelectorAll('.filter-input[type="date"]')[1].value;
        
        // 模拟筛选提示
        alert('筛选条件：\n退货单号：' + (returnNo || '全部') + '\n供应商：' + supplier + '\nSKU：' + (sku || '全部') + '\n原因：' + reason + '\n状态：' + status + '\n日期：' + dateFrom + ' ~ ' + dateTo);
      }

function showApproveDetail(code) { alert('查看审批详情: ' + code); }

function showAsnDetail(asnNo) {
        document.getElementById('asnDetailModal').style.display = 'flex';
      }

function showDeviceDetail(mac,model,user,account,errcount,enabled,online,lasttime) { var m=document.getElementById('modal-device-detail');m.style.display='flex';document.body.style.overflow='hidden'; document.getElementById('detail-mac').textContent=mac||''; document.getElementById('detail-model').textContent=model||''; document.getElementById('detail-user').textContent=user||''; document.getElementById('detail-account').textContent=account||''; document.getElementById('detail-errcount').textContent=(errcount||0)+' 次'; document.getElementById('detail-enabled').textContent=enabled||''; document.getElementById('detail-online').textContent=online||''; document.getElementById('detail-lasttime').textContent=lasttime||''; }

function showDiffDetail(code) { alert('差异详情: ' + code); }

function showDiffForPlan(code) { alert('查看差异: ' + code); }

function showDockDetail(code) { alert('月台详情: ' + code); }

function showLocationDetail(code) { alert('库位详情: ' + code); }

function showPickingDetail(no) {
        var m = document.getElementById('modal-picking-detail');
        m.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }

function showProcessingDetail(code) {
        if (code) document.getElementById('detail-processing-no').textContent = code;
        var m = document.getElementById('modal-processing-detail');
        m.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }

function showProductDetail(sku) {
        var m = document.getElementById('modal-product-detail');
        m.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }

function showSortingDetail(no) {
        var m = document.getElementById('modal-sorting-detail');
        m.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }

function showStocktakeDetail(code) { alert('查看盘点详情: ' + code); }

function showStrategyDetail(code) { alert('策略详情: ' + code); }

function showSupplierDetail(code) {
        var m = document.getElementById('modal-supplier-detail');
        m.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }

function showTrackDetail(orderNo) {
        // 模拟切换运单详情的交互
        document.querySelectorAll('.table-card > div[style*="padding:12px"]').forEach(el => {
          el.style.background = 'white';
        });
        event.currentTarget.style.background = '#EEF2FF';
      }

function showWaveDetail(code) {
        var m = document.getElementById('modal-wave-detail');
        m.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }

function showZoneDetail(code) {
        var m = document.getElementById('modal-zone-detail');
        m.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }

function startPicking(no) {
        alert('拣货单 ' + no + ' 开始拣货');
      }

function startProcessing(code) {
        alert('加工单 ' + code + ' 开始加工');
      }

function startSorting(no) {
        alert('分拣单 ' + no + ' 开始分拣');
      }

function switchPickingView(view) {
        document.querySelectorAll('.picking-view').forEach(v => v.style.display = 'none');
        document.getElementById('picking-' + view).style.display = 'block';
        const tabs = document.querySelectorAll('.tabs .tab');
        tabs.forEach((t, i) => {
          if ((view === 'kanban' && i === 0) || (view === 'list' && i === 1)) {
            t.style.background = '#EEF2FF';
            t.style.color = '#4F46E5';
          } else {
            t.style.background = '#F3F4F6';
            t.style.color = '#6B7280';
          }
        });
      }

function syncProducts() {
        alert('正在同步主数据，请稍候...');
      }

function toggleChildren(id) {
        // Simple toggle - in real app would toggle visibility
        alert('展开/折叠层级 ' + id);
      }

function toggleStatus(mac, targetStatus) { var statusText=targetStatus==='enabled'?'启用':'停用'; alert('设备 '+mac+' 已'+statusText); }

function toggleWarehouseStatus(code, targetStatus) {
        var action = targetStatus === 'disabled' ? '停用' : '启用';
        alert('仓库 ' + code + ' 已' + action);
      }

function toggleWaveStatus(code, targetStatus) {
        var action = targetStatus === 'disabled' ? '停用' : '启用';
        alert('策略 ' + code + ' 已' + action);
      }

function trackReturn(returnId) {
        alert('追踪退货单: ' + returnId);
      }

function unfreeze(mac) { alert('设备 '+mac+' 已解除冻结'); }

function unlockLocation(code) { alert('解锁库位: ' + code); }

function uploadPhoto() {
        alert('打开图片上传窗口');
      }

function withdrawStocktake(code) { alert('撤回盘点: ' + code); }

function openAddTransferModal() {
        var m = document.getElementById('modal-add-transfer');
        m.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
      
      function closeAddTransferModal() {
        var m = document.getElementById('modal-add-transfer');
        m.style.display = 'none';
        document.body.style.overflow = '';
      }
      
      function showOutboundDetail(id) {
        var m = document.getElementById('modal-transfer-outbound-detail');
        m.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
      
      function closeOutboundDetailModal() {
        var m = document.getElementById('modal-transfer-outbound-detail');
        m.style.display = 'none';
        document.body.style.overflow = '';
      }
      
      function showInboundDetail(id) {
        var m = document.getElementById('modal-transfer-inbound-detail');
        m.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
      
      function closeInboundDetailModal() {
        var m = document.getElementById('modal-transfer-inbound-detail');
        m.style.display = 'none';
        document.body.style.overflow = '';
      }
      
      function confirmDispatch(id) {
        alert('发运确认功能');
      }
      
      function confirmSign(id) {
        alert('签收确认功能');
      }
      
      function approveTransfer(id) {
        alert('审核功能');
      }
      
      function showTransferDetail(id) {
        alert('调拨详情: ' + id);
      }
      
      function exportTransferList() {
        alert('导出功能');
      }
      
      function searchTransferList() {
        alert('查询功能');
      }
      
      function resetTransferList() {
        alert('重置功能');
      }
      
      function addTransferSkuRow() {
        alert('添加商品行');
      }
      
      function saveAddTransfer() {
        alert('保存调拨单');
        closeAddTransferModal();
      }

function openAddAsnModal() {
        document.getElementById('addAsnModal').style.display = 'flex';
      }

function closeAddAsnModal() {
        document.getElementById('addAsnModal').style.display = 'none';
      }

function addAsnItem() {
        alert('添加商品功能 - 可选择SKU并添加到列表');
      }

function openAddDeliveryModal() {
        document.getElementById('addDeliveryModal').style.display = 'flex';
      }

function closeAddDeliveryModal() {
        document.getElementById('addDeliveryModal').style.display = 'none';
      }

function addDeliveryPoint() {
        alert('添加自提点功能');
      }

function showDeliveryDetail(id) {
        document.getElementById('deliveryDetailModal').style.display = 'flex';
      }

function closeDeliveryDetail() {
        document.getElementById('deliveryDetailModal').style.display = 'none';
      }

function switchDeliveryDetailTab(tabName) {
        document.querySelectorAll('.detail-tab').forEach(tab => tab.style.display = 'none');
        document.getElementById('detail-tab-' + tabName).style.display = 'block';
      }

function resetDeliveryFilters() {
        document.querySelectorAll('#page-delivery .filter-select').forEach(s => s.selectedIndex = 0);
        document.querySelectorAll('#page-delivery .filter-input').forEach(i => i.value = '');
      }

function searchDelivery() {
        alert('查询功能 - 实际项目中会调用API过滤数据');
      }

function batchApproveOutbound() {
        alert('批量装车出库审批 - 选择要装车的发货单');
      }
