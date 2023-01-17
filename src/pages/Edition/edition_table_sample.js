<Card>
<UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

<Scrollbar>
  <TableContainer sx={{ minWidth: 800 }}>
    <Table>
      <UserListHead
        order={order}
        orderBy={orderBy}
        headLabel={TABLE_HEAD}
        rowCount={edition.length}
        numSelected={selected.length}
        onRequestSort={handleRequestSort}
        onSelectAllClick={handleSelectAllClick}
      />
      <TableBody>
        {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
          const { id, edition, district} = row;
          const isItemSelected = selected.indexOf(edition) !== -1;

          return (
            <TableRow
              hover
              key={id}
              tabIndex={-1}
              role="checkbox"
              selected={isItemSelected}
              aria-checked={isItemSelected}
            >
              <TableCell padding="checkbox">
                <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, edition)} />
              </TableCell>
              <TableCell component="th" scope="row" padding="none">
                <Stack direction="row" alignItems="center" spacing={2}>
                  {/* <Avatar alt={name} src={avatarUrl} /> */}
                  <Typography variant="subtitle2" noWrap>
                    {edition.pub.pub_name}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell align="left">{edition.edition}</TableCell>
              <TableCell align="left">{district.district}</TableCell>
              <TableCell align="left">{district.state.state}</TableCell>
              {/* <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
              <TableCell align="left">
                <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                  {sentenceCase(status)}
                </Label>
              </TableCell> */}

              <TableCell align="right">
                <UserMoreMenu />
              </TableCell>
            </TableRow>
          );
        })}
        {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>

      {isUserNotFound && (
        <TableBody>
          <TableRow>
            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
              <SearchNotFound searchQuery={filterName} />
            </TableCell>
          </TableRow>
        </TableBody>
      )}
    </Table>
  </TableContainer>
</Scrollbar>

<TablePagination
  rowsPerPageOptions={[5, 10, 25]}
  component="div"
  count={edition.length}
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={handleChangePage}
  onRowsPerPageChange={handleChangeRowsPerPage}
/>
      </Card>